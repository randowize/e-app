export function delay(millis: number ) {
    return new Promise(res => {
        setTimeout(res, millis);
    });
};