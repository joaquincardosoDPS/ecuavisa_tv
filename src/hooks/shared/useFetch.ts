import { useState, useEffect, useRef, useCallback } from 'react';

interface UseFetchState<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

interface UseFetchOptions {
    enabled?: boolean;
}

export function useFetch<T>(
    fetchFn: () => Promise<T>,
    deps: unknown[] = [],
    options: UseFetchOptions = {},
): UseFetchState<T> & { refetch: () => void } {
    const { enabled = true } = options;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(enabled);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchRef = useRef(fetchFn);
    fetchRef.current = fetchFn;

    const refetch = useCallback(() => {
        if (!enabled) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setError(null);

        fetchRef.current()
            .then((result) => {
                setData(result);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setError(err);
                setIsLoading(false);
            });
    }, [enabled]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { refetch(); }, [enabled, ...deps]);

    return { data, isLoading, isError, error, refetch };
}
