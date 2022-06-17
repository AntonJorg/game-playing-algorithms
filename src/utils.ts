type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> }

export function* zip<T extends Array<any>>(
    ...toZip: Iterableify<T>
): Generator<T> {
    // Get iterators for all of the iterables.
    const iterators = toZip.map(i => i[Symbol.iterator]())

    while (true) {
        // Advance all of the iterators.
        const results = iterators.map(i => i.next())

        // If any of the iterators are done, we should stop.
        if (results.some(({ done }) => done)) {
            break
        }

        // We can assert the yield type, since we know none
        // of the iterators are done.
        yield results.map(({ value }) => value) as T
    }
}

export function argMax(arr: number[]): number {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        };
    };

    return maxIndex;
};

export function hashCode(str: string): number {
    var h: number = 0;
    for (var i = 0; i < str.length; i++) {
        h = 31 * h + str.charCodeAt(i);
    }
    return h & 0xFFFFFFFF
}

export function isDefined(e: number | undefined): e is number {
    return !!e
}