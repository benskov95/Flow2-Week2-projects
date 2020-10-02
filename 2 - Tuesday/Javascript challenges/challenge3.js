
// Challenge 3
// What are the pros & cons (if any) in these five ways of doing the same thing?
// One does not work. Why (explain) and fix it
// Which one would you prefer (if any)?

var numbers = [1, 3, 5, 10, 11];

function makeListItem(number) {
  return `<li>${number}</li>`
}

let listItems = numbers.map(makeListItem).join("\n") // first
// console.log(listItems)

listItems = numbers.map(function (number) { // returns same as first
  return `<li>${number}</li>`
}).join("\n")
// console.log(listItems)

listItems = numbers.map(number => `<li>${number}</li>`).join("\n") // returns same as first, works as a one-liner because of the backticks(``) regardless of how many actual lines there are.
// console.log(listItems)

listItems = numbers.map(number => { // returns blank lines. Works if 'return' is added to the
  `<li>${number}</li>`              // method body (before <li>...).
}).join("\n")
// console.log(listItems)

listItems = numbers.map(number => (  // returns same as first. Seems the difference between this
  `<li>${number}</li>`               // and the one above is the use of parentheses instead of
)).join("\n")                        // curly braces for the arrow function definition.
 console.log(listItems)


 // The other functions work without 'return' because it is implicitly 
 // added to the function in one-line functions. The curly braces require
 // us to manually add it to make the function work (the second last one)
 // because they indicate that the function will consist of multiple lines.

 // The last one works while the second last doesn't for this reason, since it
 // uses parentheses instead of curly braces. In fact, it seems like the function
 // even works without parentheses because it is a one-line function.