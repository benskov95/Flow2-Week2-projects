let name = { name: "Peter", age: 14, gender: "male" }

// keys = properties
function printObjectDetails(obj) {
  const count = Object.keys(obj).length;
  console.log(`This object has ${count} properties`)
  console.log("Keys and Values for the object are: ")
  for (const [key, value] of Object.entries(obj)) {
      console.log(`${key} : ${value}`);
  }
}
printObjectDetails(name)
