import type { Program } from '@/interfaces/catalog.interface';
import styles from '../ProgramPage.module.css';

interface DetailsProgramProps {
    programDetail: Program;
}

/** Formatea el campo actors que puede ser string o array */
function formatActors(actors: any): string {
    if (!actors) return '';
    if (typeof actors === 'string') return actors;
    if (Array.isArray(actors)) {
        return actors
            .map((a: any) => (typeof a === 'string' ? a : a?.name || ''))
            .filter(Boolean)
            .join(', ');
    }
    return '';
}

function DetailsProgram({ programDetail }: DetailsProgramProps) {
    const yearProduction = programDetail.anio_production;
    const casting = formatActors(programDetail.actors);

    return (
        <div style={{ marginTop: '2rem', marginLeft: '1rem' }}>
            <h3 className={styles.detailsHeading}>Sinopsis</h3>

            <div className={styles.detailsSection}>
                {/* Columna izquierda: sinopsis */}
                <div className={styles.detailsSynopsis}>
                    <p className={styles.detailsText}>
                        {programDetail.description || programDetail.description_short || 'Sinopsis no disponible.'}
                    </p>
                </div>

                {/* Columna derecha: metadata */}
                <div className={styles.detailsMeta}>
                    {yearProduction && (
                        <p className={styles.detailsValue}>
                            Año: {yearProduction}.
                        </p>
                    )}
                    {casting && (
                        <p className={styles.detailsValue} style={{ marginTop: '0.5rem' }}>
                            Elenco: {casting}.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsProgram;
