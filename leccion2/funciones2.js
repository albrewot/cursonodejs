function getMaxValue(array) {
    var maxValue = 0;

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (element > maxValue) {
            maxValue = element;
        }
        console.log(maxValue);
    }
    return maxValue;
}

const arr = [1, 99, 106, 707, 56, 245, 565];

const maxValue = getMaxValue(arr);

console.log(`maxValue = ${maxValue}`);

