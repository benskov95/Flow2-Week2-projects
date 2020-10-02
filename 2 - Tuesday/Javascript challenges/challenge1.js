// Challenge 1:
let car = {make: "volvo", year: 2011}
console.log(car) //1

// 1
// let carCopy = car; // <-- reference to original car object, all changes to it affect car.

// 1-b
let carCopy = {...car}; // <-- clone of car object, becomes a separate object.

console.log(carCopy) //2

carCopy.year = 2018;

console.log(car) //3
console.log(carCopy) //4