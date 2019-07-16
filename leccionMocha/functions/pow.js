module.exports = function pow(x, n) {
    let result = 1
    for (let i = 0; i < n; i++) {
        result *= x
    }
    console.log(result)
    return result;
}