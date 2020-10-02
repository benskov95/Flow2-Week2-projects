// Challenge 2:

var numbers = [1, 3, 5, 10, 11];

function makeListItem(number) {
  return `<li>${number}</li>`;
}

function changeSign(number) {
    return number * -1;
  }

//let listItems = numbers.map(makeListItem).join(""); I don’t exist :-( (hypothetically...)

function myMap(array, callback) {
    let arrayCopy = [];
    array.forEach(element => {
        const newItem = callback(element);
        arrayCopy.push(newItem);
    });
    return arrayCopy;
}

let listItems = myMap(numbers,makeListItem).join("");
let changeItems = myMap(numbers, changeSign).join("");
console.log(listItems);
console.log(changeItems);