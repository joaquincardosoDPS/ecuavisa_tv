import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
    /** Texto visible del botón */
    children: React.ReactNode;
    /** Variante visual */
    variant?: ButtonVariant;
    /** Muestra una flecha de Play a la izquierda */
    showArrow?: boolean;
    /** Focus key para navegación espacial (obligatorio para TV) */
    focusKey: string;
    /** Callback al presionar Enter (control remoto) */
    onPress?: () => void;
    /** Callback al hacer click (Magic Mouse / F6.2) */
    onClick?: () => void;
    /** Callback al recibir foco */
    onFocused?: () => void;
    /** Callback para control de navegación direccional */
    onArrowPress?: (direction: string) => boolean;
    /** Clase CSS adicional */
    className?: string;
}

export function Button({
    children,
    variant = 'primary',
    showArrow = false,
    focusKey,
    onPress,
    onClick,
    onFocused,
    onArrowPress,
    className,
}: ButtonProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: () => onPress?.(),
        onFocus: () => onFocused?.(),
        onArrowPress: onArrowPress as (direction: string) => boolean,
    });

    const classList = [
        styles.btn,
        styles[variant],
        focused && styles.focused,
        showArrow && styles.withArrow,
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classList}
            onClick={() => {
                onPress?.();
                onClick?.();
            }}
        >
            {children}
        </button>
    );
}
