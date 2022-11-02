


function *InsertionSort(arr, low, n, v) {  // Insertion Sort
    let array = v.state.array; 
    let j;

    for (var i = low+1; i < n+1; i++) {  
        let key = array[i];  
        j = i - 1;  

        while (j >= 0 && array[j] > key) { 
            v.selected = v.selected.fill(0, i, array.length-1);
            array[j + 1] = array[j];  
            j = j - 1; 
            if (v.state.mode) {
                v.selected[j + 1] = 2;
                yield {numbers :array}; 
                v.selected[j + 1] = 0;
            }
        }   
        array[j + 1] = key; 

        v.selected[i] = 2;
        v.selected[j + 1] = 2;
        yield {numbers :array};

        v.selected[j + 1] = 3;
        v.selected[i] = 3;
        yield {numbers :array};
    }  
}


export default function *QuickInsertionSort(v) {  
    let array = v.state.array;
    yield *quickInsertionSort(array, 0, array.length - 1, v)
}

function *quickInsertionSort(arr, low, high, v) {
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

    if (high - low > 7) {
        let pi = yield* partition(arr, low, high, v);

        yield* quickInsertionSort(arr, low, pi - 1, v);
        yield* quickInsertionSort(arr, pi + 1, high, v);
    }
    else {
        yield* InsertionSort(arr, low, high, v)
    }
}