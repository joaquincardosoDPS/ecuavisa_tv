import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProgramDetail } from '@/hooks/useProgramDetail';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import ProgramSingleView from './ProgramSingleView';
import ProgramView from './ProgramView';

function ProgramPage() {
    const { slug } = useParams<{ slug: string }>();
    const [isChildLoading, setIsChildLoading] = useState(true);

    const {
        data: programDetail,
        isLoading: isLoadingProgramDetail,
        isError,
    } = useProgramDetail(slug || '');

    const showSpinner = isLoadingProgramDetail || isChildLoading;

    if (isLoadingProgramDetail) {
        return <FullScreenSpinner />;
    }

    if (isError || !programDetail) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                color: '#ef4444',
                fontSize: 'var(--font-size-subtitle)',
            }}>
                Error al cargar el programa
            </div>
        );
    }

    return (
        <>
            {showSpinner && <FullScreenSpinner />}
            <div style={{ visibility: showSpinner ? 'hidden' : 'visible' }}>
                {programDetail.single_episode === true ? (
                    <ProgramSingleView
                        program={programDetail}
                        setIsLoading={setIsChildLoading}
                    />
                ) : (
                    <ProgramView
                        program={programDetail}
                        slug={slug || ''}
                        setIsLoading={setIsChildLoading}
                    />
                )}
            </div>
        </>
    );
}

export default ProgramPage;
