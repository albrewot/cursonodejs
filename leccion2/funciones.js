function sumTwoParams(one, two) {
    one = (one) ? one : 0;
    two = (two) ? two : 0;
    
    return one + two;
}

var sum = (one, two, three) => {
    one = (one) ? one : 0;
    two = (two) ? two : 0;
    three = (three) ? three : 0;
    
    return one + two + three;
}

console.log(sum(1, 2, 3));
console.log(sumTwoParams(1, 2));