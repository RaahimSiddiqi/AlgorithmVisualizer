

export default function *BubbleSort(v) { 

    let array = v.state.array;
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < ( array.length - i -1 ); j++){  
            v.selected = v.selected.fill(0, 0, array.length - i);
            v.selected[j] = 1;
            v.selected[j+1] = 1;
            yield {numbers :array};

            if (array[j] > array[j+1]) {
                var temp = array[j]
                array[j] = array[j + 1]
                array[j+1] = temp

                v.selected[j] = 2;
                v.selected[j+1] = 2;
                yield {numbers :array};
            }
        }
        v.selected[array.length - i - 2] = 0;
        v.selected[array.length - i - 1] = 3;
        yield {numbers :array};
    }
}