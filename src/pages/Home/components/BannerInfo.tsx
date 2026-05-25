import { useNavigate } from 'react-router-dom';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import type { Program } from '@/interfaces/catalog.interface';
import { Button } from '@/components/ui/Button';
import { SIDEBAR_FOCUS_KEY } from '@/layout/sidebar/constants';
import styles from './BannerInfo.module.css';

interface BannerInfoProps {
    program: Program;
    onPlayFocused?: () => void;
}

export function BannerInfo({ program, onPlayFocused }: BannerInfoProps) {
    const navigate = useNavigate();

    if (!program) return null;

    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                {program.image_logo?.medium ? (
                    <img
                        src={program.image_logo.medium}
                        alt={program.title}
                        className={styles.logo}
                    />
                ) : (
                    <h2 className={styles.fallbackTitle}>
                        {program.title}
                    </h2>
                )}
            </div>

            <div className={styles.actions}>
                <Button
                    focusKey="BANNER-PLAY"
                    variant="primary"
                    showArrow
                    onPress={() => navigate(`/programas/${program.key}`)}
                    onFocused={onPlayFocused}
                    onArrowPress={(dir) => {
                        if (dir === 'left') {
                            setFocus(SIDEBAR_FOCUS_KEY);
                            return false;
                        }
                        if (dir === 'right' || dir === 'up') return false;
                        return true;
                    }}
                >
                    Play
                </Button>
            </div>

            <p className={styles.description}>
                {program.description_short}
            </p>
        </div>
    );
}
