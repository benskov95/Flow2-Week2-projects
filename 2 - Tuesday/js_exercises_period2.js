
// 1
// a)
var names = ["Hans", "Sarah", "Erik", "Troels", "Therese"];
var filteredNames = names.filter(name => name.includes("a"));
console.log(filteredNames);

// b)
let reversedNames = names.map(name => name.split("").reverse().join(""));
console.log(reversedNames);

// 2
// a)
console.log(myFilter(names, containsA));

function myFilter(array, callback) {
    return callback(array);
}

function containsA(array) {
    let filtered = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes("a")) {
            filtered[i] = array[i];
        }
    }
    return filtered;
}

// b)
console.log(myMap(names, reverseName));

function myMap(array, callback) {
    return callback(array);
}

function reverseName(array) {
    let mapped = [];
    for (let i = 0; i < array.length; i++) {
        mapped[i] = array[i].split("").reverse().join("");
    }
    return mapped;
}

// 3
// a)
var numbers = [1, 3, 5, 10, 11];
var result = numbers.map(function(number, current, array) {
    if (array[current + 1]) {
        return number + array[current + 1];
    }
    return number;
});
console.log(result);

// for b and c: newlines are just there to make it easier to read in the terminal.
// b)
let namesWithHTML = names.map(name => "<a href=\"\">" + name);
let endTags = namesWithHTML.join("</a>\n");
let completeNav = "<nav>\n" + endTags + "</a>\n</nav>";
console.log(completeNav);

// c)
var persons = [{name:"Hassan",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Boline", phone: "79345"}];
let tableStart = "\n<table>\n<tr>\n<th>Name</th>\n<th>Phone</th>\n</tr>"
let pTableMap = persons.map(p => "\n<tr>\n<td>" + p.name + "</td>\n<td>" + p.phone + "</td>\n</tr>");
let pTableJoin = pTableMap.join("");
let completeTable = tableStart + pTableJoin + "\n</table>";
console.log(completeTable);

// 4
// a)
var all= ["Hassan", "Peter", "Carla", "Boline"];
let joined = all.join("#");
console.log("\n" + joined);

// b)
var numbersTwo = [2, 3, 67, 33];
let sumOfArray = numbersTwo.reduce(calcSum);
console.log(sumOfArray);

function calcSum(total, current) {
    return total + current;
}

// c)
var members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}]

var reducer = function(accumulator, member, index, arr) {
    let calcValue = accumulator + member.age;
    if (index === arr.length - 1) {
        return calcValue / arr.length;
    }
    return calcValue;
}

let res = members.reduce(reducer, 0);
console.log(res);

// d)
const votes = [ "Biden","Trump","Biden","Biden","Trump","Trump","Biden","None"];
let countedVotes = votes.reduce(function(accumulator, current) {
    if (typeof accumulator[current] == "undefined") {
        accumulator[current] = 1;
    } else {
        accumulator[current]++;
    }
    return accumulator;
}, {});
console.log(countedVotes);


// THE FOLLOWING WAS REMOVED FROM THE EXERCISE SHEET


// 5
// a)
var car = {
    brand: "Nissan",
    getBrand: function(){
      console.log(this.brand);
    }
  };
  
  var getCarBrand = car.getBrand;
  
  getCarBrand();   // output: undefined

  // Why does the call to getCarBrand() print return ‘undefined’?

  /*Because you can't assign 'this' values during execution, 
  which is what is happening here. The variable 'getCarBrand'
  tries to call the 'getBrand' function from the car object,
  but since it is bound to the car object specifically, it
  can't be reached from a different variable. If you just
  try to run the function directly from the car object, it
  works, and that's because the 'this.brand' value in the 
  function is bound to the car object.*/

  car.getBrand();

  // b)
  // Why do we get undefined when we click the button? (here: https://jsbin.com/sopedaneyo/edit?html,js,output)

  /* Again because of the 'this' being bound to the car
  object itself, so when we try to assign it to a different
  variable ('el'), the value of 'this.brand' can't be set.
  A solution to this is modifying the the '.addEventListener'
  call by changing the function call 'car.getBrand' to 
  'car.getBrand.bind(car)'. That way, we forcibly bind the
  car object to the event listener, and therefore also its
  'this' values.*/
  
// 6
// a(1))
var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
  })();
  
  add();
  add();
  console.log(add());

  // From w3schools.com:
  /*This is called a JavaScript closure. It makes it possible 
  for a function to have "private" variables. The counter is 
  protected by the scope of the anonymous function, and can 
  only be changed using the add function. */

  // b(2))
  // NOTE: Already did this in one of our JavaScript exercises in flow 1:
  function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    
    this.getInfo = function() {
        var info = "\n";
        info += this.firstName + "\n";
        info += this.lastName + "\n";
        info += this.age + "\n";
        return info;
    };
}

var p = new Person("Hans", "Hansen", 33);
console.log(p.getInfo());