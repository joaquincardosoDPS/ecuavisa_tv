import type { Program } from '@/interfaces/catalog.interface';
import CardCarrousel from '@/components/ProgramCard/CardCarrousel';
import styles from '../ProgramPage.module.css';

interface RelatedProgramsContainerProps {
    programs: Program[];
    isLoading?: boolean;
    onRowFocused?: () => void;
}

function RelatedProgramsContainer({
    programs,
    isLoading = false,
    onRowFocused,
}: RelatedProgramsContainerProps) {
    if (isLoading) {
        return <p className={styles.statusText}>Cargando programas relacionados...</p>;
    }

    if (programs.length === 0) {
        return (
            <p className={styles.emptyText}>
                No hay programas relacionados disponibles.
            </p>
        );
    }

    return (
        <CardCarrousel
            programs={programs}
            orientation="horizontal"
            focusKeyPrefix="PROGRAM-RELATED"
            onRowFocused={onRowFocused}
        />
    );
}

export default RelatedProgramsContainer;
