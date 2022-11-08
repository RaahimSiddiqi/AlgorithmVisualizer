export default function* MergeSort(v) {
    let array = [...v.state.array]

    function *merge_sort(array, left, right) {
        if (left >= right) return;
        function *merge(array, left, mid, right) {
            const n1 = mid - left + 1;
            const n2 = right - mid;
            const L = new Array(n1);
            const R = new Array(n2);

            v.selected.fill(1, left, mid+1);
            v.selected.fill(1, mid, right+1);
            yield { numbers: array }

            for(let i = 0 ; i < n1 ; i++){ 
                L[i] = array[left + i]; 
            } 
            for(let i = 0 ; i < n2 ; i++){ 
                R[i] = array[mid + 1 + i]; 
            }           
            let i = 0;
            let j = 0;
            let k = left;
            
            while (i < n1 && j < n2) {
                if (L[i] < R[j]) {
                    array[k] = L[i]
                    v.selected[k] = 2
                    yield {numbers: array}
                    v.selected[k] = 1
                    i += 1
                }
                else {
                    array[k] = R[j]
                    v.selected[k] = 2
                    yield {numbers: array}
                    v.selected[k] = 1
                    j += 1
                }
                k++;
            }

            while (i < n1) {
                array[k] = L[i];
                v.selected[k] = 2
                yield {numbers: array}
                v.selected[k] = 1
                i++;
                k++;
            }
            while (j < n2) {
                array[k] = R[j];
                v.selected[k] = 2
                yield {numbers: array}
                v.selected[k] = 1
                j++;
                k++;
            }
            v.selected.fill(0, left, mid+1);
            v.selected.fill(0, mid, right+1);
        }
        const mid = left + Math.floor((right - left)/2); 
        yield* merge_sort(array, left, mid); 
        yield* merge_sort(array, mid + 1, right); 
        yield* merge(array, left, mid, right); 
    }
    yield* merge_sort(array, 0, array.length-1); 
}


// export default function *MergeSort(v) { 
//     let array = [...v.state.array];
//     let oarray = [...v.state.array];
//     yield* mergesort(array, oarray, 0, array.length, v);
// }


// function *mergesort(array, oarray, low, high, v) {
//     if (array.length < 2)            
//         return array
     
//     let result = []                  
//     let mid = Math.floor(array.length / 2)

//     v.selected.fill(1, 0, mid);
//     v.selected.fill(1, mid, array.length);
//     if (v.state.mode == 0) yield { numbers: oarray }
//     v.selected = v.selected.fill(0, mid);
//     let y = yield* mergesort([...array.slice(0, mid)], oarray, 0, mid-1, v)      
//     let z = yield* mergesort([...array.slice(mid, array.length)], oarray, mid, high, v)   
//     let i = 0
//     let j = 0
//     let k = low

//     while (i < y.length && j < z.length) { 
//         if (y[i] > z[j]) {
//             result.push(z[j])
//             oarray[k] = z[j]
//             j += 1
//         }
//         else {
//             result.push(y[i])
//             oarray[k] = y[i]
//             i += 1
//         }
//         v.selected[k] = 1;
//         yield {numbers: oarray}
//         v.selected[k] = 0;
//         k++;
//     }
//     // result = result.concat(y.slice(i, y.length))         
//     // result = result.concat(z.slice(j, z.length))   
//     while (j < z.length) {
//         result.push(z[j])
//         oarray[k++] = z[j]
//         yield {numbers: oarray}
//         j += 1
//     } 

//     while (i < y.length) {
//         result.push(y[i])
//         oarray[k++] = y[i]
//         yield {numbers: oarray}
//         i += 1
//     }
//     v.selected[k] = 1;
//     yield {numbers: oarray}
//     v.selected[k] = 0;    
//     yield {numbers: oarray} 
//     return result;
// }

// function *mergesort(arr, oarray, low, v) {
//     var sorted = arr.slice(),
//         n = sorted.length,
//         buffer = new Array(n);
  
//     for (var size = 1; size < n; size *= 2) {
//       for (var leftStart = 0; leftStart < n; leftStart += 2*size) {
//         var left = leftStart,
//             right = Math.min(left + size, n),
//             leftLimit = right,
//             rightLimit = Math.min(right + size, n),
//             i = left;

//         while (left < leftLimit && right < rightLimit) {
//           if (sorted[left] <= sorted[right]) {
//             buffer[i++] = sorted[left++];
//           } else {
//             buffer[i++] = sorted[right++];
//           }
//           if (size > 1) yield { numbers: buffer }
//         }

//         while (left < leftLimit) {
//           buffer[i++] = sorted[left++];
//           if (size > 1) yield { numbers: buffer }
//         }
//         while (right < rightLimit) {
//           buffer[i++] = sorted[right++];
//           if (size > 1) yield { numbers: buffer }
//         }

//       }
//       var temp = sorted,
//           sorted = buffer,
//           buffer = temp;
//     }
//     return sorted;
//   }






// export default function *MergeSort(v) { 
//     let array = v.state.array;
//     let oarray = [...v.state.array];
//     yield* mergesort(array, oarray, 0, array.length - 1, v);
// }

// function *mergesort(array, oarray, low, high, v) {
//     if (array.length < 2)            
//         return array
     
//     let result = []                  
//     let mid = Math.floor(array.length / 2)
     
//     let y = yield* mergesort(array.slice(0, mid), oarray, 0, mid-1, v)      
//     let z = yield* mergesort(array.slice(mid, array.length), oarray, mid, high, v)   
//     console.log("y: ", y, "  z: ", z)    
//     let i = 0
//     let j = 0

//     while (i < y.length && j < z.length) {  
//         if (y[i] > z[j]) {
//             result.push(z[j])
//             oarray[low] = z[j]
//             j += 1
//             low += 1
//         }
//         else {
//             result.push(y[i])
//             oarray[low] = y[i]
//             i += 1
//             low += 1
//         }
//         v.selected[low] = 1;
//         console.log(low, high)
//         yield {numbers: oarray}
//         v.selected[low] = 0;
//     }
//     // result = result.concat(y.slice(i, y.length))         
//     // result = result.concat(z.slice(j, z.length))   
//     while (j < z.length) {
//         result.push(z[j])
//         oarray[low] = z[j]
//         j += 1
//         low += 1
//     } 
//     v.selected[low] = 1;
//     console.log(low, high)
//     yield {numbers: oarray}
//     v.selected[low] = 0;

//     while (i < y.length) {
//         result.push(y[i])
//         oarray[low] = y[i]
//         i += 1
//         low += 1
//     }
//     v.selected[low] = 1;
//     console.log(low, high)
//     yield {numbers: oarray}
//     v.selected[low] = 0;     
//     return result;
// }
