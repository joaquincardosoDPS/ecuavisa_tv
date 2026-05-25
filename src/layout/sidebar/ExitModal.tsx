import { useEffect } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import styles from './ExitModal.module.css';

interface ExitModalButtonProps {
    text: string;
    focusKey: string;
    onClick: () => void;
}

function ExitModalButton({ text, focusKey, onClick }: ExitModalButtonProps) {
    const { ref, focused } = useFocusable({
        focusKey,
        onEnterPress: onClick,
    });

    const classList = [
        styles.btn,
        focused && styles.focused,
    ].filter(Boolean).join(' ');

    return (
        <button ref={ref} className={classList} onClick={onClick}>
            {text}
        </button>
    );
}

interface ExitModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ExitModal({ visible, onConfirm, onCancel }: ExitModalProps) {
    const { ref, focusKey } = useFocusable({
        isFocusBoundary: true,
        focusKey: 'EXIT-MODAL',
    });

    useEffect(() => {
        if (visible) {
            setFocus('EXIT-MODAL-NO');
        }
    }, [visible]);

    const classList = [
        styles.overlay,
        !visible && styles.hidden,
    ].filter(Boolean).join(' ');

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={classList}>
                <div className={styles.content}>
                    <p className={styles.title}>¿Estás seguro que deseas salir de la aplicación?</p>
                    <div className={styles.buttons}>
                        <ExitModalButton text="Sí" focusKey="EXIT-MODAL-YES" onClick={onConfirm} />
                        <ExitModalButton text="No" focusKey="EXIT-MODAL-NO" onClick={onCancel} />
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
}
