
function Heapify(arr, n, selected) {
    for(let i = 1; i < n; i++){
        if (arr[i] > arr[parseInt((i - 1) / 2)]) {
            let j = i;

            while (arr[j] > arr[parseInt((j - 1) / 2)]) {   
                const l = j;                                    
                const r = parseInt((j - 1) / 2); 

                [arr[l], arr[r]] = [arr[r], arr[l]]; //Swap
                j = parseInt((j - 1) / 2); //reduce
            } 
        }
    }
}

function HeapSort(array) {
    Heapify(array, array.length);

    for (let i = array.length - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; 

        let j = 0, index;
        do { 
            index = (2 * j + 1); 

            if (index < (i - 1) && array[index] < array[index + 1]) 
                index++; 

            if (index < i && array[j] < array[index]) 
                [array[j], array[index]] = [array[index], array[j]];

            j = index; 
        } while (index < i); 
    }
}

