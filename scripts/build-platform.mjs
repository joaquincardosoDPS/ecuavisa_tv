/**
 * Build script para plataformas Smart TV
 * Uso: node scripts/build-platform.mjs <platform>
 * Plataformas: webos | tizen | hisense
 *
 * Output: platforms/<platform>/ contiene el build completo + manifiestos
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { transformSync } from '@babel/core';

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

// 3b. Forzar ES5 en polyfills-legacy.js (arrow functions rompen Chrome < 45 / webOS 3.x)
const polyfillsPath = join(PLATFORM_BUILD, 'assets', 'polyfills-legacy.js');
if (existsSync(polyfillsPath)) {
    console.log('🔧 Transpilando polyfills-legacy.js a ES5...');
    const code = readFileSync(polyfillsPath, 'utf-8');
    const result = transformSync(code, {
        plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-block-scoping'],
        configFile: false,
        babelrc: false,
    });
    writeFileSync(polyfillsPath, result.code, 'utf-8');
    console.log('  ✓ polyfills-legacy.js → ES5');
}

// 4. Copiar manifiestos de la plataforma (appinfo.json, config.xml, etc.) al build
const manifestFiles = ['appinfo.json', 'config.xml'];
for (const file of manifestFiles) {
    const src = join(PLATFORM_DIR, file);
    if (existsSync(src)) {
        cpSync(src, join(PLATFORM_BUILD, file));
        console.log(`  ✓ ${file}`);
    }
}

// 5. Copiar assets de la plataforma (iconos, logos)
import { readdirSync } from 'node:fs';
const assetExtensions = ['.png', '.jpg', '.svg', '.ico'];
for (const file of readdirSync(PLATFORM_DIR)) {
    if (assetExtensions.some(ext => file.endsWith(ext))) {
        cpSync(join(PLATFORM_DIR, file), join(PLATFORM_BUILD, file));
        console.log(`  ✓ ${file}`);
    }
}

// 6. Post-procesar HTML para compatibilidad con Smart TVs antiguas (webOS 3, Tizen 2.4)
// El mecanismo type="module" / nomodule de @vitejs/plugin-legacy NO funciona
// en navegadores muy viejos (Chromium 38-53). La solución es eliminar todos los
// scripts type="module" y cargar los scripts legacy directamente.
if (platform === 'webos' || platform === 'tizen') {
    const indexPath = join(PLATFORM_BUILD, 'index.html');
    let html = readFileSync(indexPath, 'utf-8');

    // Eliminar TODOS los <script type="module"...>...</script>
    // Estos son: polyfills modernos, entry moderno, y scripts de detección legacy
    html = html.replace(/<script\s+type="module"[^>]*>[\s\S]*?<\/script>\s*/g, '');

    // Eliminar <link rel="modulepreload"...>
    html = html.replace(/<link\s+rel="modulepreload"[^>]*>\s*/g, '');

    // Eliminar atributo nomodule de los scripts restantes (para que se carguen normalmente)
    html = html.replace(/ nomodule/g, '');

    // Eliminar atributo crossorigin (causa problemas CORS en protocolo file://)
    html = html.replace(/ crossorigin/g, '');

    writeFileSync(indexPath, html);
    console.log('  ✓ index.html post-procesado para compatibilidad con navegadores legacy');
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
