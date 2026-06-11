/**
 * Oculta el splash HTML de index.html con una transición suave.
 * Se llama desde WhoIsThereView cuando los perfiles están listos.
 */
export function dismissSplash() {
    const splash = document.getElementById('app-splash');
    if (!splash) return;

    splash.classList.add('splash-hide');
    // Remover del DOM después de la transición
    setTimeout(() => {
        splash.remove();
    }, 400);
}
