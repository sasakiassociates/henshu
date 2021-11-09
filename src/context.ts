import { createContext, useContext } from 'react';


export type GetterSetter = {
    get(): any;
    set(value: any): void;
};

export function useHenshu() {
    return useContext(HenshuContext);
}

export interface IHenshuContext {
    editing: boolean;
    bindTo(key: string): GetterSetter;
};

const DefaultContext: IHenshuContext = {
    editing: false,
    bindTo(_: string) { return { get() { return '' }, set(_: any) {}}; }
}

const HenshuContext = createContext<IHenshuContext>(DefaultContext);

export { DefaultContext };
export default HenshuContext;
