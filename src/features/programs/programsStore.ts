import { useSyncExternalStore } from 'react';
import type { Program } from '@/interfaces/catalog.interface';

interface ProgramsState {
    activeProgram: Program | null;
}

interface ProgramsActions {
    setActiveProgram: (program: Program | null) => void;
}

let state: ProgramsState = { activeProgram: null };

const listeners = new Set<() => void>();

function setState(partial: Partial<ProgramsState>) {
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
}

function getState(): ProgramsState & ProgramsActions {
    return { ...state, ...actions };
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

const actions: ProgramsActions = {
    setActiveProgram: (program) => setState({ activeProgram: program }),
};

type Selector<T> = (state: ProgramsState & ProgramsActions) => T;

export function useProgramsStore<T>(selector: Selector<T>): T {
    return useSyncExternalStore(
        subscribe,
        () => selector(getState()),
    );
}

useProgramsStore.getState = getState;
