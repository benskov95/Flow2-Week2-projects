import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import userFacade from "./userFacade"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

loadJokes();

function loadJokes() {
const jokes = jokeFacade.getJokes();
let jokeList = jokes.map(joke => `<li>${joke}</li>`);
const listItemsAsStr = jokeList.join("");
document.getElementById("jokes").innerHTML = listItemsAsStr;
}

const jokeParagraph = document.getElementById("getJokeContent");
document.getElementById("getJoke").addEventListener("click", getJokeByID);

function getJokeByID() {
  let input = document.getElementById("jokeInput").value;
  var joke = jokeFacade.getJokeById(input);
  if (typeof joke === "undefined") {
    jokeParagraph.innerText = "Joke with provided ID does not exist.";
  } else {
  jokeParagraph.innerText = joke;
  }
}

document.getElementById("addJoke").addEventListener("click", addJoke);

// I used to hate facial hair...but then it grew on me. <-- free test joke
function addJoke() {
  let input = document.getElementById("jokeInput").value;
  if (input.length > 10) {
    jokeFacade.addJoke(input);
    jokeParagraph.innerText = "Joke added.";
    loadJokes();
  } else {
    jokeParagraph.innerText = "Write a joke!";
  }

}

/* JS For Exercise-2 below */

const quoteURL = "https://studypoints.info/jokes/api/jokes/period/hour";
fetchQuote();
setInterval(() => {
  fetchQuote();
}, 3600000); 

function fetchQuote() {
  let quote = document.getElementById("quoteContent");
  fetch(quoteURL)
  .then(res => res.json())
  .then(joke => quote.innerText = joke.joke);
}

// Explain why, what you did above, is possible, when we 
// know the Same Origin Policy governs where AJAX-requests 
// can go.

// It is possible because of the 'Access-Control-Allow'
// response headers which allow for cross-origin resource
// sharing (CORS). These are:

// 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'
// and 'Access-Control-Allow-Origin'. Specifically the 'origin'
// one which has '*' as its value, meaning anyone from anywhere
// can send requests and get responses from the api.

/* JS For Exercise-3 below */

// Get all users
getAllUsers();

function getAllUsers() {
userFacade.getUsers()
.then(users => {
  const userRows = users.map(user =>`
  <tr>
  <td>${user.id}</td>
  <td>${user.age}</td>
  <td>${user.name}</td>
  <td>${user.gender}</td>
  <td>${user.email}</td>
  </tr>
  `)
  const userRowsAsString = userRows.join("");
  document.getElementById("allUserRows").innerHTML = userRowsAsString;
  });
}

  // Get a user by id
  document.getElementById("findUser").addEventListener("click", function() {
    let content = document.getElementById("foundUserContent");
    let input = document.getElementById("findUserInput").value;
    let userString = "";
    userFacade.getUser(input)
    .then(user => {
      if (input.length < 1) {
        content.innerText = "Enter an ID in the text box."
      } else {
      for(const [key, value] of Object.entries(user)) {
        if (key !== "id") { 
        userString += `${key} : ${value}\n`;
        }
      }
      content.innerText = userString;
      removeStatusText(content, 15000);
    }
    })
    .catch(e => {
      printError(e, content);
    })
  });

  // Add a new user
  const addFormElems = document.getElementById("addForm").elements;
  let addStatus = document.getElementById("addUserStatus");

  document.getElementById("addUser").addEventListener("click", function() {
    let user = {
      name : addFormElems.namedItem("aName").value,
      age : addFormElems.namedItem("aAge").value,
      gender : addFormElems.namedItem("aGender").value,
      email : addFormElems.namedItem("aEmail").value
    };
    
    userFacade.addUser(user)
    .then(newUser => {
      addStatus.innerText = "User has been added. ID: " + newUser.id;
      getAllUsers();
      removeStatusText(addStatus, 10000);
    })
    .catch(e => {
      printError(e, addStatus);
    })
  });

  // Edit a user
  const editFormElems = document.getElementById("editForm").elements;
  let editStatus = document.getElementById("editUserStatus");
  let providedID = editFormElems.namedItem("eId");

  document.getElementById("userInfo").addEventListener("click", function() {
    editStatus.innerText = "";
    if (providedID.value.length < 1) {
      editStatus.innerHTML = "<strong>ID MUST be provided.</strong>";
      removeStatusText(editStatus, 10000);
    } else {
    userFacade.getUser(providedID.value)
    .then(user => {
      editFormElems.namedItem("eName").value = user.name;
      editFormElems.namedItem("eAge").value = user.age;
      editFormElems.namedItem("eGender").value = user.gender;
      editFormElems.namedItem("eEmail").value = user.email;      
    })
    .catch(e => {
      printError(e,  editStatus);
    })}
  });

  document.getElementById("editUser").addEventListener("click", function() {
    editStatus.innerText = "";
    if (providedID.value.length < 1) {
      editStatus.innerHTML = "<strong>ID MUST be provided.</strong>";
    } else {
    let user = {
      id : providedID.value,
      name : editFormElems.namedItem("eName").value,
      age : editFormElems.namedItem("eAge").value,
      gender : editFormElems.namedItem("eGender").value,
      email : editFormElems.namedItem("eEmail").value
    };

    userFacade.editUser(user)
    .then(editedUser => {
      editStatus.innerText = `User (ID: ${editedUser.id}) has been edited.`
      getAllUsers();
      removeStatusText(editStatus, 10000);
    })
    .catch(e => {
      printError(e, editStatus);
    })} 
  });

  // Delete a user
  document.getElementById("deleteUser").addEventListener("click", function() {
    let content = document.getElementById("deletedUserContent");
    let input = document.getElementById("deleteUserInput").value;
    if (input.length < 1) {
      content.innerText = "Enter an ID in the text box."
    } else {
    userFacade.deleteUser(input)
    .then(user => {
      // Returned data ('user') is an empty object here.
      content.innerText = `User (ID: ${input}) has been deleted.`;
      getAllUsers();
      removeStatusText(content, 10000);
    }
    )
    .catch(e => {
      printError(e, content);
    })}
  });

// Helper function for printing errors
function printError(promise, element) {
  promise.fullError.then(function(error) {
    element.innerText = `${error.status} : ${error.msg}`;
  })}

// Helper function for removing status text after a while
function removeStatusText(textElement, duration) {
  setTimeout(function() {
    textElement.innerText = "";
  }, duration);
}


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



