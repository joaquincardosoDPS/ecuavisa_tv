/**
 * Build script para plataformas Smart TV
 * Uso: node scripts/build-platform.mjs <platform>
 * Plataformas: webos | tizen | hisense
 *
 * Output: platforms/<platform>/ contiene el build completo + manifiestos
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';

const platform = process.argv[2];
const validPlatforms = ['webos', 'tizen', 'hisense'];

if (!platform || !validPlatforms.includes(platform)) {
    console.error(`❌ Plataforma inválida. Usa: ${validPlatforms.join(' | ')}`);
    process.exit(1);
}

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const PLATFORM_DIR = join(ROOT, 'platforms', platform);
const PLATFORM_BUILD = join(PLATFORM_DIR, 'build');

// 1. Build de producción
console.log(`\n🔨 Building para ${platform.toUpperCase()}...\n`);
execSync('npx vite build', { cwd: ROOT, stdio: 'inherit' });

// 2. Limpiar build anterior de la plataforma
if (existsSync(PLATFORM_BUILD)) {
    rmSync(PLATFORM_BUILD, { recursive: true, force: true });
}

// 3. Copiar dist → platforms/<platform>/build
console.log(`\n📦 Copiando build a platforms/${platform}/build...\n`);
cpSync(DIST, PLATFORM_BUILD, { recursive: true });

// 4. Copiar manifiestos de la plataforma (appinfo.json, config.xml, etc.) al build
const manifestFiles = ['appinfo.json', 'config.xml'];
for (const file of manifestFiles) {
    const src = join(PLATFORM_DIR, file);
    if (existsSync(src)) {
        cpSync(src, join(PLATFORM_BUILD, file));
        console.log(`  ✓ ${file}`);
    }
}

console.log(`\n✅ Build para ${platform.toUpperCase()} listo en platforms/${platform}/build\n`);

if (platform === 'webos') {
    console.log(`📱 Empaquetar:  ares-package --no-minify ./platforms/webos/build`);
    console.log('📲 Instalar:    ares-install <archivo.ipk>');
    console.log('🚀 Lanzar:      ares-launch com.digitalproserver.chvtv');
} else if (platform === 'tizen') {
    console.log(`📱 Empaquetar:  tizen package -t wgt -s <cert> -- ./platforms/tizen/build`);
    console.log('📲 Instalar:    tizen install -n <archivo.wgt>');
    console.log('🚀 Lanzar:      tizen run -p DigitalPS.chvtv');
} else if (platform === 'hisense') {
    console.log(`📱 Comprimir platforms/hisense/build/ como .zip y subir al portal VIDAA`);
}
