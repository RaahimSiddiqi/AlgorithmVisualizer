


export default function *QuickSort(v) {  
    let array = v.state.array;
    yield *quickSort(array, 0, array.length - 1, v)
}

function *quickSort(arr, low, high, v) {
    function *partition(arr, low, high, v) {
        let pivot = arr[high];
        let i = (low - 1);

        for (let j = low; j <= high - 1; j++) {
            if (arr[j] <= pivot) {
                i++;

                [arr[i], arr[j]] = [arr[j], arr[i]]
                v.selected[i] = 2;
                v.selected[j] = 2;
                yield { numbers: arr}
                v.selected[i] = 0;
                v.selected[j] = 0;
            }
        }
        [arr[i+ 1], arr[high]] = [arr[high], arr[i+ 1]]
        v.selected[i+1] = 2;
        v.selected[high] = 2;
        yield { numbers: arr}
        v.selected[i+1] = 0;
        v.selected[high] = 0;
        return i + 1;
    }

    if (low < high) {
        let pi = yield* partition(arr, low, high, v);

        yield* quickSort(arr, low, pi - 1, v);
        yield* quickSort(arr, pi + 1, high, v);
    }
}