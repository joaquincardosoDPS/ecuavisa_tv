import { Outlet } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useBackHandler } from '@/hooks/shared/useBackHandler';
import { exitApp } from '@/utils/platform';
import { Sidebar } from './sidebar/Sidebar';
import { ExitModal } from './sidebar/ExitModal';
import { SIDEBAR_FOCUS_KEY, CONTENT_FOCUS_KEY } from './sidebar/constants';
import styles from './MainLayout.module.css';

/** Contenedor de contenido con su propio FocusContext para saveLastFocusedChild */
function ContentWrapper() {
    const { ref, focusKey } = useFocusable({
        focusKey: CONTENT_FOCUS_KEY,
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        onArrowPress: (direction) => {
            if (direction === 'left') {
                setFocus(SIDEBAR_FOCUS_KEY);
                return false;
            }
            return true;
        },
    });

    return (
        <FocusContext.Provider value={focusKey}>
            <main
                ref={ref}
                className={styles.content}
                style={{ paddingLeft: '9vw' }}
            >
                <Outlet />
            </main>
        </FocusContext.Provider>
    );
}

function MainLayout() {
    const [showExit, setShowExit] = useState(false);

    const { ref, focusKey } = useFocusable({
        focusKey: 'MAIN-LAYOUT',
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
    });

    const handleExitRequest = useCallback(() => {
        setShowExit(true);
    }, []);

    const { restoreFocus } = useBackHandler(handleExitRequest);

    const handleExitConfirm = useCallback(() => {
        exitApp();
    }, []);

    const handleExitCancel = useCallback(() => {
        setShowExit(false);
        restoreFocus();
    }, [restoreFocus]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div ref={ref} className={styles.layout}>
                <Sidebar />
                <ExitModal
                    visible={showExit}
                    onConfirm={handleExitConfirm}
                    onCancel={handleExitCancel}
                />
                <ContentWrapper />
            </div>
        </FocusContext.Provider>
    );
}

export default MainLayout;