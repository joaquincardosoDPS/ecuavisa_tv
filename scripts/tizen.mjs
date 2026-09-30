#!/usr/bin/env node
/**
 * Certificado y conexión con la TV Samsung (Tizen) por línea de comandos,
 * sin depender de la extensión de VS Code.
 *
 * Uso:
 *   node scripts/tizen.mjs <comando> [args]
 *
 * Comandos:
 *   connect [ip]     Conecta con la TV por sdb (puerto 26101)
 *   disconnect [ip]  Desconecta la TV
 *   devices          Lista las TVs conectadas
 *   profiles         Lista los perfiles de firma registrados y cuál está activo
 *   cert             Registra (o reemplaza) el perfil de firma con un certificado
 *
 * Variables de entorno:
 *   TV_IP                IP de la TV (también se puede pasar como argumento)
 *   TIZEN_TZ             Ruta al binario `tz`
 *   TIZEN_SDB            Ruta al binario `sdb`
 *   TIZEN_PROFILE        Nombre del perfil de firma (default: Ecuavisa)
 *   TIZEN_AUTHOR_CERT    author.p12 a registrar
 *   TIZEN_AUTHOR_PWD     Contraseña del author.p12 (si falta, se busca en <cert>.pwd junto al certificado)
 *   TIZEN_DIST_CERT      distributor.p12 a registrar
 *   TIZEN_DIST_PWD       Contraseña del distributor.p12 (default: la del author)
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HOME = homedir();
const EXT_SDK = join(HOME, '.tizen-extension-platform/server/sdktools');
const EXT_TOOLS = join(EXT_SDK, 'data/tools');
const PROFILES_XML = join(EXT_SDK, 'sdk-data/profile/profiles.xml');
const SDB_PORT = '26101';
const PASSWORD_FLAGS = new Set(['-p', '-P', '-w', '--password', '--dist-password', '--dist2-password']);
const DEFAULT_CERTS = {
    author: join(HOME, 'SamsungCertificate/13goCertificados/tizenkeys/author.p12'),
    distributor: join(HOME, 'SamsungCertificate/PruebaDist/distributor.p12'),
};

function die(message) {
    console.error(`\n✖ ${message}\n`);
    process.exit(1);
}

function resolveBin(envValue, candidates) {
    if (envValue) {
        return envValue;
    }
    return candidates.find((candidate) => existsSync(candidate)) ?? candidates.at(-1);
}

const TZ = resolveBin(process.env.TIZEN_TZ, [join(EXT_TOOLS, 'tizen-core/tz'), 'tz']);
const SDB = resolveBin(process.env.TIZEN_SDB, [join(EXT_TOOLS, 'sdb'), join(HOME, 'tizen-studio/tools/sdb'), 'sdb']);

function run(bin, args, opts = {}) {
    const printable = args.map((arg, index) => (PASSWORD_FLAGS.has(args[index - 1]) ? '********' : arg));
    const suffix = opts.cwd ? `  (en ${relative(ROOT, opts.cwd) || '.'})` : '';
    console.log(`\n$ ${bin} ${printable.join(' ')}${suffix}`);
    const result = spawnSync(bin, args, { stdio: 'inherit', ...opts });
    if (result.error) {
        die(`No se pudo ejecutar "${bin}": ${result.error.message}`);
    }
    if (result.status !== 0) {
        die(`"${bin} ${printable.join(' ')}" terminó con código ${result.status}`);
    }
    return result;
}

function requireTvIp(ip) {
    if (!ip) {
        die('Falta la IP de la TV. Pásala como argumento (npm run tizen:connect -- 192.168.1.50) o define TV_IP.');
    }
    return ip.includes(':') ? ip : `${ip}:${SDB_PORT}`;
}

/** Separa "la TV no está en la red" (ningún servicio responde) de "sdb no conecta" (modo dev). */
function respondsToPing(ip) {
    return spawnSync('ping', ['-c', '1', '-W', '1', ip], { stdio: 'ignore' }).status === 0;
}

function capture(bin, args) {
    const result = spawnSync(bin, args, { encoding: 'utf8' });
    if (result.error) {
        die(`No se pudo ejecutar "${bin}": ${result.error.message}`);
    }
    const raw = `${result.stdout ?? ''}${result.stderr ?? ''}`;
    // tz colorea sus etiquetas con códigos ANSI: se quitan para poder mostrarlas y parsearlas.
    return raw.replace(/\u001b\[[0-9;]*m/g, '').trim();
}

const DEVICE_STATE = {
    device: 'lista para usarse',
    offline: 'sin conexión',
    unauthorized: 'conexión no autorizada (acepta el permiso en la TV)',
};

function sdbDevices() {
    // La primera línea de "sdb devices" es siempre el encabezado.
    return capture(SDB, ['devices'])
        .split('\n')
        .slice(1)
        .map((line) => line.trim().split(/\s+/))
        .filter((columns) => columns.length >= 2)
        .map(([serial, state, name]) => ({ serial, state, name: name || 'sin nombre' }));
}

function showDevices(devices) {
    if (devices.length === 0) {
        console.log(
            '\nℹ No hay ninguna TV conectada.\n' +
                '  Cómo conectarla:\n' +
                '    1. En la TV: Apps → escribe 12345 → activa "Developer mode" y pon como "Host PC IP" la IP de este PC.\n' +
                '    2. Reinicia la TV (el modo desarrollador se activa al reiniciar).\n' +
                '    3. En la terminal: npm run tizen:connect -- <IP de la TV>\n',
        );
        return;
    }

    console.log(`\nTVs encontradas: ${devices.length}`);
    for (const { serial, state, name } of devices) {
        console.log(`  • ${serial}  (${name}) — ${DEVICE_STATE[state] ?? `estado: ${state}`}`);
    }
    console.log('');
}

function signingProfiles() {
    const output = capture(TZ, ['security-profiles', 'list']);
    const active = /Current Active Profile:\s*(\S*)/.exec(output)?.[1] ?? '';
    const profiles = [];

    for (const line of output.split('\n')) {
        if (!line.trim() || /^Current Active Profile/.test(line) || line.startsWith('[')) {
            continue;
        }
        if (!line.startsWith(' ')) {
            profiles.push({ name: line.trim(), author: '', distributor: '' });
            continue;
        }
        const item = /^\s+(Author|Distributor)\s*:\s*(.*)$/.exec(line);
        if (item && profiles.length > 0) {
            profiles.at(-1)[item[1].toLowerCase()] = item[2].trim();
        }
    }

    return { active, profiles };
}

function showProfiles() {
    const { active, profiles } = signingProfiles();
    console.log(`\nPerfil de firma activo: ${active || '(ninguno)'}`);

    if (profiles.length === 0) {
        console.log('\nℹ No hay ningún perfil registrado. Ejecuta: npm run tizen:cert\n');
        return;
    }

    const missing = (path) => (path && !existsSync(path) ? '   ⚠ el archivo no existe' : '');

    console.log(`\nPerfiles registrados (${profiles.length}):`);
    for (const { name, author, distributor } of profiles) {
        console.log(`\n${name === active ? '▶' : '•'} ${name}${name === active ? '  ← activo' : ''}`);
        console.log(`    author      : ${author || '(sin definir)'}${missing(author)}`);
        console.log(`    distributor : ${distributor || '(sin definir)'}${missing(distributor)}`);
    }
    console.log('');
}

function readPasswordFile(certPath) {
    const passwordFile = `${certPath.replace(/\.p12$/, '')}.pwd`;
    return existsSync(passwordFile) ? readFileSync(passwordFile, 'utf8').trim() : '';
}

/** Un perfil con contraseña inválida rompe el empaquetado, así que se comprueba antes de registrarlo. */
function passwordOpensCert(certPath, password) {
    const tempPassword = join(tmpdir(), `tizen-pwd-${process.pid}-${Math.random().toString(36).slice(2)}`);
    writeFileSync(tempPassword, password, { mode: 0o600 });
    try {
        // Los .p12 generados por Samsung suelen usar cifrado legacy (RC2/3DES), que OpenSSL 3 solo abre con -legacy.
        return [
            ['-in', certPath, '-passin', `file:${tempPassword}`, '-noout'],
            ['-legacy', '-in', certPath, '-passin', `file:${tempPassword}`, '-noout'],
        ].some((args) => spawnSync('openssl', ['pkcs12', ...args], { stdio: 'ignore' }).status === 0);
    } finally {
        rmSync(tempPassword, { force: true });
    }
}

function resolvePassword(certPath, label, candidates) {
    const password = candidates.find((candidate) => candidate && passwordOpensCert(certPath, candidate));
    if (!password) {
        die(`Ninguna de las contraseñas disponibles abre ${certPath} (${label}). Pásala en TIZEN_AUTHOR_PWD / TIZEN_DIST_PWD o déjala en ${certPath.replace(/\.p12$/, '')}.pwd.`);
    }
    return password;
}

const commands = {
    connect(args) {
        const target = requireTvIp(args[0] || process.env.TV_IP);
        const [ip] = target.split(':');
        console.log(`\nℹ Conectando con la TV en ${target}…`);

        const reachable = respondsToPing(ip);
        const output = capture(SDB, ['connect', target]);
        const devices = sdbDevices();

        if (!devices.some((device) => device.serial === target && device.state === 'device')) {
            showDevices(devices);
            if (!reachable) {
                die(
                    `La TV no responde en la red (${ip} no contesta a ping).\n\n` +
                        '  No es el script ni sdb: el equipo no está alcanzable desde este PC. Revisa:\n' +
                        '   • que la TV esté ENCENDIDA (en standby profundo suele soltar la red),\n' +
                        '   • su IP actual: Ajustes → General → Red → Estado de red (si cambió por DHCP, usa esa),\n' +
                        `   • que esté en la misma red/VLAN que este PC (Wi-Fi con aislamiento de clientes la bloquea),\n` +
                        '   • un `arp -a` o el listado DHCP del router para confirmar que la TV está conectada.',
                );
            }
            die(
                `No se pudo conectar con la TV en ${target}.\n\n` +
                    `  Respuesta de sdb: ${output}\n\n` +
                    '  La TV responde en la red, así que falta el lado del televisor:\n' +
                    '   • modo desarrollador activo (Apps → 12345 → Developer mode ON → Host PC IP = IP de este PC),\n' +
                    '   • la TV se haya reiniciado después de activarlo (el modo dev se aplica al reiniciar).',
            );
        }

        console.log(`✔ TV conectada: ${target}\n\nSiguiente paso:  npm run deploy:tizen\n`);
    },

    disconnect(args) {
        const target = requireTvIp(args[0] || process.env.TV_IP);
        console.log(`\nℹ Desconectando la TV ${target}…`);
        capture(SDB, ['disconnect', target]);
        showDevices(sdbDevices());
    },

    devices() {
        showDevices(sdbDevices());
    },

    profiles() {
        showProfiles();
    },

    cert() {
        const profile = process.env.TIZEN_PROFILE || 'Ecuavisa';
        const author = resolve(process.env.TIZEN_AUTHOR_CERT || DEFAULT_CERTS.author);
        const distributor = resolve(process.env.TIZEN_DIST_CERT || DEFAULT_CERTS.distributor);
        [author, distributor].forEach((cert) => {
            if (!existsSync(cert)) {
                die(`No existe el certificado ${cert}. Ajusta TIZEN_AUTHOR_CERT / TIZEN_DIST_CERT.`);
            }
        });

        const authorPwd = resolvePassword(author, 'author', [process.env.TIZEN_AUTHOR_PWD, readPasswordFile(author)]);
        const distributorPwd = resolvePassword(distributor, 'distributor', [
            process.env.TIZEN_DIST_PWD,
            readPasswordFile(distributor),
            authorPwd,
        ]);

        console.log(
            `\nℹ Registrando el perfil de firma…\n` +
                `  perfil      : ${profile}\n` +
                `  author      : ${author}\n` +
                `  distributor : ${distributor}\n` +
                `  store       : ${PROFILES_XML}`,
        );

        // "add" falla si el perfil ya existe: se elimina antes para poder re-ejecutar el comando.
        spawnSync(TZ, ['security-profiles', 'remove', profile], { stdio: 'ignore' });
        run(TZ, ['security-profiles', 'add', '-n', profile, '-a', author, '-p', authorPwd, '-d', distributor, '-P', distributorPwd, '-A']);
        console.log(`\n✔ Certificado registrado y activado para el perfil "${profile}".`);
        showProfiles();
    },

    help() {
        console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].replace(/^#!.*\n/, ''));
    },
};

const [command, ...args] = process.argv.slice(2);

if (!command || !commands[command]) {
    commands.help();
    process.exit(command ? 1 : 0);
}

commands[command](args);
