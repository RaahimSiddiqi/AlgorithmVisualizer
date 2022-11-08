
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
            let temp = [...array]
            temp[j + 1] = key
            
            v.selected[i] = 3;
            v.selected[j + 1] = 2;
            yield {numbers : temp}; 
            v.selected[j + 1] = 3;
        }  
        array[j + 1] = key; 

        v.selected[j + 1] = 2;
        yield {numbers :array};

        v.selected[j + 1] = 3;
        yield {numbers :array};
    }  
}