
// We saw, in the previous task, that a one-liner arrow function 
// gets an implicit return. The code snippet below is seen as an 
// onliner, so complete the code below to return a string with four 
// table rows. You must obey these rules.

// The code must be easy to read (which often calls for more lines)
// EVERYTHING you do must be done inside the two backtick operators

var members = [
    { name: "Peter", age: 14, gender : "male" },
    { name: "Jan", age: 35, gender : "male" },
    { name: "Janne", age: 25,  gender : "female" },
    { name: "Martin", age: 22, gender : "male" }]
  
  const tableRows = members.map(member => `
    <tr>
    <td>${member.name}</td>
    <td>${member.age}</td>
    <td>${member.gender}</td>
    </tr>
    `).join("\n")

    console.log(tableRows);
  
    // An arrow function does not need parentheses if
    // it only takes a single argument (like above).
    // If it takes more than one, you would put them
    // in parentheses before the arrow symbol like this:

    // (arg1, arg2) => 