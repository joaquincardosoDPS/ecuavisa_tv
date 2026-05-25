import { useSyncExternalStore } from 'react';
import type { AppConfig } from '../../interfaces/config.interface';

interface ConfigState {
    config: AppConfig | null;
}

interface ConfigActions {
    setConfig: (config: AppConfig) => void;
}

let state: ConfigState = { config: null };

const listeners = new Set<() => void>();

function setState(partial: Partial<ConfigState>) {
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
}

function getState(): ConfigState & ConfigActions {
    return { ...state, ...actions };
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

const actions: ConfigActions = {
    setConfig: (config) => setState({ config }),
};

type Selector<T> = (state: ConfigState & ConfigActions) => T;

export function useConfigStore<T>(selector: Selector<T>): T {
    return useSyncExternalStore(
        subscribe,
        () => selector(getState()),
    );
}

useConfigStore.getState = getState;