import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import styles from './OnScreenKeyboard.module.css';

/* ── Layout del teclado ──
   Cada sub-array es una fila visual.
   Las teclas especiales usan span para flex proporcional.
*/
export type KeyDef = {
    label: string;
    value: string;
    span?: number;
    action?: 'space' | 'search' | 'delete' | 'clear';
};

const ROWS: KeyDef[][] = [
    [
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
        { label: 'c', value: 'c' },
        { label: 'd', value: 'd' },
        { label: 'e', value: 'e' },
        { label: 'f', value: 'f' },
    ],
    [
        { label: 'g', value: 'g' },
        { label: 'h', value: 'h' },
        { label: 'i', value: 'i' },
        { label: 'j', value: 'j' },
        { label: 'k', value: 'k' },
        { label: 'l', value: 'l' },
    ],
    [
        { label: 'm', value: 'm' },
        { label: 'n', value: 'n' },
        { label: 'ñ', value: 'ñ' },
        { label: 'o', value: 'o' },
        { label: 'p', value: 'p' },
        { label: 'q', value: 'q' },
    ],
    [
        { label: 'r', value: 'r' },
        { label: 's', value: 's' },
        { label: 't', value: 't' },
        { label: 'u', value: 'u' },
        { label: 'v', value: 'v' },
        { label: 'w', value: 'w' },
    ],
    [
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
        { label: 'z', value: 'z' },
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
    ],
    [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
    ],
    [
        { label: '9', value: '9' },
        { label: 'Espacio', value: ' ', span: 4, action: 'space' },
        { label: '⌫', value: '', span: 1, action: 'delete' },
    ],
];

interface KeyButtonProps {
    keyDef: KeyDef;
    focusKey: string;
    onKeyPress: (keyDef: KeyDef) => void;
    isFirstInRow?: boolean;
    onEscapeLeft?: () => void;
}

function KeyButton({ keyDef, focusKey, onKeyPress, isFirstInRow, onEscapeLeft }: KeyButtonProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: () => onKeyPress(keyDef),
        onArrowPress: (direction) => {
            if (direction === 'left' && isFirstInRow && onEscapeLeft) {
                onEscapeLeft();
                return false;
            }
            return true;
        },
    });

    const classList = [
        styles.key,
        focused && styles.focused,
        keyDef.action && styles.actionKey,
        keyDef.span === 2 && styles.span2,
        keyDef.span === 3 && styles.span3,
        keyDef.span === 4 && styles.span4,
        keyDef.span === 5 && styles.span5,
        keyDef.span === 6 && styles.span6,
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classList}
            onClick={() => onKeyPress(keyDef)}
        >
            {keyDef.action === 'delete' ? (
                <svg className={styles.deleteIcon} viewBox="0 0 24 24">
                    {/* Backspace shape: left-pointing polygon */}
                    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    {/* X inside */}
                    <line x1="16.5" y1="8.5" x2="10.5" y2="14.5" />
                    <line x1="10.5" y1="8.5" x2="16.5" y2="14.5" />
                </svg>
            ) : (
                keyDef.label
            )}
        </button>
    );
}

/* ── Teclado completo ── */
interface OnScreenKeyboardProps {
    focusKeyPrefix?: string;
    /** Callback al escribir un carácter o espacio */
    onInput: (char: string) => void;
    /** Callback al presionar "BUSCAR" */
    onSearch?: () => void;
    /** Callback al presionar "✕" (borrar último carácter) */
    onDelete: () => void;
    /** Callback al presionar "BORRAR" (limpiar todo) */
    onClear?: () => void;
    /** Filas personalizadas (overrides default ROWS) */
    customRows?: KeyDef[][];
    /** Called when pressing left on the first key of any row */
    onEscapeLeft?: () => void;
}

export function OnScreenKeyboard({
    focusKeyPrefix = 'KB',
    onInput,
    onSearch,
    onDelete,
    onClear,
    customRows,
    onEscapeLeft,
}: OnScreenKeyboardProps) {
    const { ref, focusKey } = useFocusable({
        focusKey: focusKeyPrefix,
        saveLastFocusedChild: true,
        trackChildren: true,
        isFocusBoundary: false,
    });

    const handleKeyPress = (keyDef: KeyDef) => {
        switch (keyDef.action) {
            case 'search':
                onSearch?.();
                break;
            case 'delete':
                onDelete();
                break;
            case 'clear':
                onClear?.();
                break;
            default:
                onInput(keyDef.value);
                break;
        }
    };

    const rows = customRows || ROWS;

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.keyboard}>
                {rows.map((row, rowIdx) => (
                    <div key={rowIdx} className={styles.row}>
                        {row.map((keyDef, keyIdx) => (
                            <KeyButton
                                key={`${keyDef.label}-${keyIdx}`}
                                keyDef={keyDef}
                                focusKey={`${focusKeyPrefix}-r${rowIdx}-${keyDef.label}`}
                                onKeyPress={handleKeyPress}
                                isFirstInRow={keyIdx === 0}
                                onEscapeLeft={onEscapeLeft}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </FocusContext.Provider>
    );
}
