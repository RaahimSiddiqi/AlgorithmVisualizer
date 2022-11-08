
export default function *HeapSort(v) {
    let array = v.state.array;
    let flag = 0;
    function *Heapify(arr, n, selected) {
        for(let i = 1; i < n; i++){
            if (arr[i] > arr[parseInt((i - 1) / 2)]) {
                let j = i;

                if (v.state.mode == 0) {
                    v.selected[i] = 1;
                    v.selected[parseInt((i - 1) / 2)] = 4;
                    yield {numbers: array}
                }
                flag = 1;

                while (arr[j] > arr[parseInt((j - 1) / 2)]) {   
                    const l = j;                                    
                    const r = parseInt((j - 1) / 2); 

                    if (flag == 0) {
                    v.selected[j] = 1;
                    v.selected[parseInt((j - 1) / 2)] = 4;
                    yield {numbers: array} }

                    [arr[l], arr[r]] = [arr[r], arr[l]]; //Swap
                    j = parseInt((j - 1) / 2); //reduce

                    v.selected[l] = 2;
                    v.selected[r] = 2;
                    yield {numbers: array}
                    v.selected[l] = 0;
                    v.selected[r] = 0;
                    flag = 0;
                } 
           }
        }
    }
    yield* Heapify(array, array.length, v.selected);
    v.selected = v.selected.fill(0);
    
    for (let i = array.length - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; 
        if (v.state.mode == 0) {
            v.selected[0] = 0;
            v.selected[i] = 3;
            yield {numbers: array}
        }
        v.selected = v.selected.fill(0, 0, i-1);

        let j = 0, index;
        do { 
            index = (2 * j + 1); 
            v.selected[(j )] = 4;
            if (v.state.mode == 0) {
                if (2 * j + 1 < i - 1) v.selected[(2 * j + 1)] = 1;
                if (2 * j + 2 < i) v.selected[(2 * j + 2)] = 1;
                if (2 * j + 2 < i && 2 * j + 1 < i - 1) yield {numbers: array}
            }
            v.selected = v.selected.fill(0, 0, i-1);

            if (index < (i - 1) && array[index] < array[index + 1]) 
                index++; 

            if (index < i && array[j] < array[index]) 
                [array[j], array[index]] = [array[index], array[j]];

            if (index < i) v.selected[(j)] = 2;
            if (index < i) v.selected[index] = 2;
            if (index < i) yield {numbers: array}
            v.selected = v.selected.fill(0, 0, i-1);

            j = index; 
        } while (index < i); 
    }
    v.selected = v.selected.fill(0);
    yield {numbers: array}
}