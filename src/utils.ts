
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

export function randomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function noop(_: any) {}

export type StringMap = {
    [key: string]: any;
};

