/**
 * Returns a copy of an object without the properties
 * specified in the second argument.
 */
export function strip(obj: any, props: string|string[]) {
    const clone = JSON.parse(JSON.stringify(obj));

    if (Array.isArray(props)) {
        props.forEach(prop => delete clone[prop]);
    }
    else {
        delete clone[props];
    }

    return clone;
}

export type StringMap = {
    [key: string]: any;
};

