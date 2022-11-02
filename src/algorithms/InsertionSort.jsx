
export default function *InsertionSort(v) {  // Insertion Sort
    let array = v.state.array; 
    let j;
    v.selected[0] = 3;
    yield {numbers :array};

    for (var i = 1; i < array.length; i++) {  
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