import { createContext, useContext } from 'react';


export type GetterSetter = {
    getter(): any;
    setter(value: any): void;
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
    bindTo(_: string) { return { getter() { return '' }, setter(_: any) {}}; }
}

const HenshuContext = createContext<IHenshuContext>(DefaultContext);

export { DefaultContext };
export default HenshuContext;
