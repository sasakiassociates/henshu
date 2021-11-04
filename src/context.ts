import { createContext, useContext } from 'react';


export function useHenshu() {
    return useContext(HenshuContext);
}

export interface IHenshuContext {
    editing: boolean;
    bindTo(key: string): { getter(): string; setter(value: string): void; };
};

const DefaultContext: IHenshuContext = {
    editing: false,
    bindTo(_: string) { return { getter() { return '' }, setter(value: string) {}}; }
}

const HenshuContext = createContext<IHenshuContext>(DefaultContext);

export { DefaultContext };
export default HenshuContext;
