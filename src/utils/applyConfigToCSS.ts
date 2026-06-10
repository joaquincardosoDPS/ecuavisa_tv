// src/utils/applyConfigToCSS.ts
// Aplica la configuración dinámica del cliente a las variables CSS de :root
import cssVars from 'css-vars-ponyfill';

export function applyConfigToCSS(config: any) {
    if (!config) return;
    const root = document.documentElement;

    // Map de clave-config → nombre de variable CSS
    const varMap: Record<string, string> = {
        'clr-primary':               '--clr-primary',
        'clr-secondary':             '--clr-secondary',
        'clr-primary-title':         '--clr-primary-title',
        'clr-secondary-title':       '--clr-secondary-title',
        'clr-primary-button':        '--clr-primary-button',
        'clr-secondary-button':      '--clr-secondary-button',
        'clr-primary-subtitle':      '--clr-primary-subtitle',
        'clr-secondary-subtitle':    '--clr-secondary-subtitle',
        'clr-primary-text':          '--clr-primary-text',
        'clr-secondary-text':        '--clr-secondary-text',
        'clr-text-primary-button':   '--clr-text-primary-button',
        'clr-text-secondary-button': '--clr-text-secondary-button',
        'clr-text-tertiary-button':  '--clr-text-tertiary-button',
        'clr-icon':                  '--clr-icon',
        'clr-edit':                  '--clr-edit',
        'foc-primary':               '--foc-primary',
        'foc-secondary':             '--foc-secondary',
        'foc-tertiary':              '--foc-tertiary',
        'grad-banner':               '--grad-banner',
        'grad-sidebar':              '--grad-sidebar',
        'font-family-title':         '--font-family-title',
        'font-family-text':          '--font-family-text',
        'font-family-button':        '--font-family-button',
        'font-family-subtitle':      '--font-family-subtitle',
        'font-size-title':           '--font-size-title',
        'font-size-subtitle':        '--font-size-subtitle',
        'font-size-text':            '--font-size-text',
        'font-size-subtext':         '--font-size-subtext',
        'font-title':                '--font-title',
        'font-subtitle':             '--font-subtitle',
        'font-text':                 '--font-text',
        'font-weight-title':         '--font-weight-title',
        'font-weight-subtitle':      '--font-weight-subtitle',
        'font-weight-text':          '--font-weight-text',
        'font-weight-subtext':       '--font-weight-subtext',
    };

    // 1. Aplicar vía setProperty (browsers modernos con soporte nativo de CSS vars)
    const ponyfillVars: Record<string, string> = {};
    Object.entries(varMap).forEach(([key, cssVar]) => {
        if (config[key]) {
            root.style.setProperty(cssVar, config[key]);
            ponyfillVars[cssVar] = config[key];
        }
    });

    // 2. Inyectar etiqueta <style> con las variables para que el ponyfill las detecte
    //    (necesario para webOS 3.x / Chrome <49 que no soporta CSS vars nativas)
    let styleTag = document.getElementById('__config-vars__') as HTMLStyleElement | null;
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = '__config-vars__';
        document.head.appendChild(styleTag);
    }
    const cssText = ':root {\n' +
        Object.entries(ponyfillVars).map(([k, v]) => `  ${k}: ${v};`).join('\n') +
        '\n}';
    styleTag.textContent = cssText;

    // 3. Re-ejecutar el ponyfill pasando las variables explícitamente
    cssVars({ watch: false, silent: true, variables: ponyfillVars });
}
