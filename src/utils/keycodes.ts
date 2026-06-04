/**
 * Mapa global de teclas por acción lógica.
 * Cada plataforma (Tizen, webOS, Hisense, navegador) usa códigos distintos.
 * Nunca se deben usar números mágicos en los componentes. 
 */

export type InputAction =
    | 'Back'
    | 'Enter'
    | 'Play'
    | 'Pause'
    | 'PlayPause'
    | 'Stop'
    | 'Forward'
    | 'Rewind'
    | 'ChannelUp'
    | 'ChannelDown'
    | 'ColorRed'
    | 'ColorGreen'
    | 'ColorYellow'
    | 'ColorBlue';

/**
 * Cada entrada mapea un InputAction a los posibles `event.key` / `event.code`
 * que lo representan en las distintas plataformas.
 */
const KEY_MAP: Record<InputAction, string[]> = {
    Back: [
        'Backspace',       // Navegador / PC
        'Escape',          // PC
        'XF86Back',        // Tizen (Samsung)
        'GoBack',          // webOS (LG)
        '10009',           // Tizen keyCode como string
        '461',             // webOS keyCode como string
    ],
    Enter: [
        'Enter',
        'Return',          // webOS
        '13',
    ],
    Play: [
        'MediaPlay',       // Estándar MediaKey
        'XF86AudioPlay',   // Tizen
        '415',             // Tizen keyCode
    ],
    Pause: [
        'MediaPause',
        'XF86AudioPause',  // Tizen
        '19',              // Tizen keyCode
    ],
    PlayPause: [
        ' ',               // Espacio (navegador)
        'MediaPlayPause',
        '10252',           // Tizen keyCode
    ],
    Stop: [
        'MediaStop',
        'XF86AudioStop',   // Tizen
        '413',             // Tizen keyCode
    ],
    Forward: [
        'MediaFastForward',
        'XF86AudioFastForward', // Tizen
        '417',             // Tizen keyCode
    ],
    Rewind: [
        'MediaRewind',
        'XF86AudioRewind', // Tizen
        '412',             // Tizen keyCode
    ],
    ChannelUp: [
        'ChannelUp',
        'XF86RaiseChannel',// Tizen
        '427',             // Tizen keyCode
    ],
    ChannelDown: [
        'ChannelDown',
        'XF86LowerChannel',// Tizen
        '428',             // Tizen keyCode
    ],
    ColorRed: [
        'ColorF0Red',
        '403',
    ],
    ColorGreen: [
        'ColorF1Green',
        '404',
    ],
    ColorYellow: [
        'ColorF2Yellow',
        '405',
    ],
    ColorBlue: [
        'ColorF3Blue',
        '406',
    ],
};

/**
 * Devuelve los códigos de tecla asociados a una acción lógica.
 */
export function getInputKeys(action: InputAction): string[] {
    return KEY_MAP[action] ?? [];
}

/**
 * Comprueba si un KeyboardEvent corresponde a una acción lógica.
 */
export function isInputAction(event: KeyboardEvent, action: InputAction): boolean {
    const keys = KEY_MAP[action];
    if (!keys) return false;
    return (
        keys.includes(event.key) ||
        keys.includes(event.code) ||
        keys.includes(String(event.keyCode))
    );
}
