function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
  }

function digitCount(num) {
    if (num === 0) return 1
    return Math.floor(Math.log10(Math.abs(num))) + 1
}

function mostDigits(nums) {
    let maxDigits = 0
    for (let i = 0; i < nums.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(nums[i]))
    }
    return maxDigits
}


export default function *RadixSort(v) {
    let colors = ["#FFD700", "#b1e6ec", "#7f5d4c", "#0c3563", "#eb7639", 
                  "#c23c3c", "#26c418", "#a6086f", "#377c99", "#444a04"]
    let array = v.state.array;
    let maxDigitCount = mostDigits(array)
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []) // [[], [], [],...]
        
        for (let i = 0; i < array.length; i++) {
            let digit = getDigit(array[i], k)
            digitBuckets[digit].push(array[i])

            // console.log(colors[digit], i, digitBuckets[digit].length)
            // v.selected.fill(colors[digit], i, i + digitBuckets[digit].length)
            // console.log(v.selected)
            // yield { numbers: array }
        }
        let start = 0;
        for (let i = 0, k = 0; i < digitBuckets.length; i++) {
          if (digitBuckets[i].length > 0) {
            for (let j = 0; j < digitBuckets[i].length; j++) {
              v.selected[start + j] = colors[i]
              array[k] = digitBuckets[i][j]
              yield { numbers: array }
              k++;
            }
            start += digitBuckets[i].length;
          }
        }


        // New order after each loop
        //array = [].concat(...digitBuckets) // flattening
        yield { numbers: array }
        v.selected.fill(0)
        yield { numbers: array }
        yield { numbers: array }
    }
  }




//   for (let i = 0; i < array.length; i++) {
//     let digit = getDigit(array[i], k)
//     digitBuckets[digit].push(array[i])
//     let start = 0;
//     for (let i = 0, ci = 0; i < digitBuckets.length; i++) {
//       if (digitBuckets[i].length > 0) {
//         let color = ci % 2 ? 1 : 4;
//         console.log(color, start, digitBuckets[i].length)
//         v.selected.fill(color, start, start + digitBuckets[i].length)
//         console.log(v.selected)
//         yield { numbers: array }
//         start += digitBuckets[i].length;
//         ci++;
//       }
//     }
// }