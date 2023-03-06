
export const getRelativeFrecuency = (total, array) => {
    let newArray = []
    if (total === 0) { return array }
    for (let index = 0; index < array.length; index++) {
        newArray[index] = (parseInt(array[index]) / total).toFixed(3)
    }
    return newArray
}

export const getAcumulateFrecuency = (nums) => {
    let prevNum = 0;
    let NewArray = []
    for (let index = 0; index < nums.length; index++) {
        NewArray[index] = parseFloat(prevNum + parseInt(nums[index]))
        prevNum = NewArray[index]
    }
    return NewArray
}