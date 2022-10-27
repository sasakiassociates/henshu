/// <reference types="react" />
export declare type GetterSetter = {
    get(): any;
    set(value: any): void;
};
export declare function useHenshu(): IHenshuContext;
export interface IHenshuContext {
    editing: boolean;
    bindTo(key: string): GetterSetter;
}
declare const DefaultContext: IHenshuContext;
declare const HenshuContext: import("react").Context<IHenshuContext>;
export { DefaultContext };
export default HenshuContext;
