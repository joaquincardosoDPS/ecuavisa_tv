/* Módulos sin tipos propios — declaraciones mínimas para tsc */

declare module '@glomex/vast-ima-player' {
    export class PlayerOptions {
        [key: string]: any;
    }
    export class Player {
        constructor(
            ima: any,
            videoElement: HTMLVideoElement,
            container: HTMLElement,
            adsRenderingSettings?: any,
            playerOptions?: PlayerOptions,
        );
        playAds(adsRequest: any): void;
        destroy(): void;
        resizeAd(width: number, height: number): void;
        addEventListener(event: string, callback: (...args: any[]) => void): void;
        removeEventListener(event: string, callback: (...args: any[]) => void): void;
    }
    export function loadImaSdk(): Promise<any>;
}

declare module 'he' {
    export function decode(html: string, options?: { isAttributeValue?: boolean; strict?: boolean }): string;
    export function encode(text: string, options?: { useNamedReferences?: boolean; decimal?: boolean; encodeEverything?: boolean; strict?: boolean; allowUnsafeSymbols?: boolean }): string;
    export function escape(text: string): string;
    export function unescape(text: string): string;
    const he: { decode: typeof decode; encode: typeof encode; escape: typeof escape; unescape: typeof unescape };
    export default he;
}
