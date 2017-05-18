import { StoreEnhancer } from 'redux';

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, pkgName?: string) => void;
};

declare var System: {
    import: <type>(url: string) => Promise<type>;
}

interface Object {
    values: <type>(obj: { [id: string]: type }) => type[]
}

declare type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}

type REDUX_DEVTOOLS_Window = {
    __REDUX_DEVTOOLS_EXTENSION__: StoreEnhancer<State>;
} & Window;

declare var window: REDUX_DEVTOOLS_Window;
