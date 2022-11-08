export default function* MergeSort(v : VisualArray){ 
     function* _merge_sort(left : number, right : number) : Generator<void>{ 
         if(left >= right) return; 
         function* Merge(left : number, mid : number, right : number){ 
             const n1 = mid - left + 1; 
             const n2 = right - mid; 
             const L = new Array(n1); 
             const R = new Array(n2); 
             for(let i = 0 ; i < n1 ; i++){ 
                 L[i] = v.get(left + i); 
             } 
             for(let i = 0 ; i < n2 ; i++){ 
                 R[i] = v.get(mid + 1 + i); 
             } 
             yield; 
             let i = 0; 
             let j = 0; 
             let k = left; 
             while (i < n1 && j < n2) { 
                 if (v.lte(L[i], R[j])) { 
                     v.set(k, L[i]); 
                     yield; 
                     i++; 
                 } 
                 else { 
                     v.set(k, R[j]); 
                     yield; 
                     j++; 
                 } 
                 k++; 
             } 
             /Copying left over elements/ 
             while (i < n1) { 
                 v.set(k, L[i]); 
                 yield; 
                 i++; 
                 k++; 
             } 
             while (j < n2) { 
                 v.set(k, R[j]); 
                 yield; 
                 j++; 
                 k++; 
             } 
         } 
         const mid = left + Math.floor((right - left)/2); 
         yield* _merge_sort(left, mid); 
         yield* _merge_sort(mid + 1, right); 
         yield* Merge(left, mid, right); 
     } 
     yield* _merge_sort(0, v.length() - 1); 
 }