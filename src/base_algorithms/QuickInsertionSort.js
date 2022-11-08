

function InsertionSort() {  // Insertion Sort
    for (var i = 1; i < array.length; i++) {  
        let key = array[i];  
        let j = i - 1;  

        while (j >= 0 && array[j] > key) { 
            array[j + 1] = array[j];  
            j = j - 1; 
        }  
        array[j + 1] = key; 
    }  
}


function QuickInsertionSort(array) {  
    quickInsertionSort(array, 0, array.length - 1)
}

function *partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    [arr[i+ 1], arr[high]] = [arr[high], arr[i+ 1]]
    return i + 1;
}

function *quickInsertionSort(arr, low, high, v) {
    if (high - low > 7) {
        let pi = partition(arr, low, high, v);

        quickInsertionSort(arr, low, pi - 1, v);
        quickInsertionSort(arr, pi + 1, high, v);
    }
    else {
        InsertionSort(arr, low, high, v)
    }
}


