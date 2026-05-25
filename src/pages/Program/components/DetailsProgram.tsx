import type { Program } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface DetailsProgramProps {
    programDetail: Program;
}

function DetailsProgram({ programDetail }: DetailsProgramProps) {
    const yearProduction = programDetail.anio_production;
    const genders = programDetail.genders
        ?.map((gender) => gender.name)
        .join(', ');
    const casting = programDetail.actors || '';

    return (
        <div className={styles.detailsSection}>
            {/* Sinopsis */}
            <div className={styles.detailsSynopsis}>
                <h3 className={styles.detailsHeading}>Sinopsis</h3>
                <p className={styles.detailsText}>
                    {programDetail.description || programDetail.description_short}
                </p>
            </div>

            {/* Metadata */}
            <div className={styles.detailsMeta}>
                {yearProduction && (
                    <div className={styles.detailsMetaItem}>
                        <p className={styles.detailsLabel}>Año</p>
                        <p className={styles.detailsValue}>{yearProduction}</p>
                    </div>
                )}
                {genders && (
                    <div className={styles.detailsMetaItem}>
                        <p className={styles.detailsLabel}>Géneros</p>
                        <p className={styles.detailsValue}>{genders}</p>
                    </div>
                )}
                {casting && (
                    <div className={styles.detailsMetaItem}>
                        <p className={styles.detailsLabel}>Elenco</p>
                        <p className={styles.detailsValue}>{casting}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsProgram;
