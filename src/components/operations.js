
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


export const getModa = (data) => {
    moda = data.countArr[0]
    howMany = 1
    who = `${data.redux[0]}, `
    index = 0
    for (let i = 1; i < data.redux.length; i++) {
        if (moda === data.countArr[i]) {
            howMany += 1
            who += `${data.redux[i]}, `
        } else if (moda < data.countArr[i]) {
            moda = data.countArr[i]
            index = i
            howMany = 1
            who = `${data.redux[i]}, `
        }
    }
    if (howMany < 4 && howMany > 1) {
        moda = who.slice(0, -2)
    } else if (howMany > 3) {
        moda = "la moda no existe"
    } else {
        moda = data.redux[index]
    }
    return moda
}

export const getMediana = (arr) => {
    newArray = quicksort(arr);
    total = newArray.length
    mitad = parseInt(total / 2)
    if (total % 2 == 0) { //par
        mitad -= 1
        mediana = (newArray[mitad] + newArray[mitad + 1]) / 2
        return mediana
    } else {//impar
        return newArray[mitad]
    }
}

export const getMedia = (arr) => {
    total = arr.length
    sum = 0;
    for (i = 0; i < total; i++) {
        sum += parseInt(arr[i])
    }
    return (sum / total).toFixed(3)

}
export const ordenar = (arr) => {
    newArr = quicksort(arr)
    let countArr = []
    let redux = []
    let i = 0;
    while (0 < newArr.length) {
        num = newArr[0];
        redux[i] = num
        countArr[i] = newArr.filter(item => { return num === item }).length
        newArr = newArr.filter(item => { return num !== item })
        i++;
    }
    return { countArr, redux }
}
function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }

    var pivot = parseInt(array[0]);

    var left = [];
    var right = [];

    for (var i = 1; i < array.length; i++) {
        parseInt(array[i]) < pivot ? left.push(parseInt(array[i])) : right.push(parseInt(array[i]));
    }

    return quicksort(left).concat(pivot, quicksort(right));
};