import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import "./personFacade"
import personFacade from "./personFacade"

/*I tried making the delete/edit links work with
 * unique classes but had no success, so I decided
 * to instead add a single letter in front of the id's
 * which I can remove with the substring function 
 * when I need to use them.
 */

getAll();
document.getElementById("reload").addEventListener("click", getAll);

function getAll() {
personFacade.getAllPersons()
.then(persons => {
    const personRows = persons.all.map(person => `
    <tr>
    <td>${person.id}</td>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.phone}</td>
    <td>${person.street}</td>
    <td>${person.zip}</td>
    <td>${person.city}</td>
    <td><a href="#" id="d${person.id}">delete</a> / <a href="myModal2" data-target="#myModal2" data-toggle="modal" id="e${person.id}">edit</a></td>
    </tr>
`);
    const personRowsAsString = personRows.join("");
    document.getElementById("tbody").innerHTML = personRowsAsString;
    addStatus.innerText = "";
});
}

 const addFormElems = document.getElementById("addForm").elements;
 let addStatus = document.getElementById("addPersonStatus");

 document.getElementById("addForm").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.getElementById("addPerson").click();
  }
})

 document.getElementById("addPerson").addEventListener("click", function() {
   addStatus.innerText = "";
   let goodToGo = true;
   let person = {
      firstName : addFormElems.namedItem("aFname").value,
      lastName : addFormElems.namedItem("aLname").value,
      phone : addFormElems.namedItem("aPhone").value,
      street : addFormElems.namedItem("aStreet").value,
      zip : addFormElems.namedItem("aZip").value,
      city : addFormElems.namedItem("aCity").value
    };
    
    for (const [key, value] of Object.entries(person)) {
        addStatus.style.color = "red";
        if (value.length < 1) {
            addStatus.innerText = "You forgot to enter something in one of the fields. All are required.";
            goodToGo = false;
            break;
        } else if (key === "zip" && isNaN(value)) {
            addStatus.innerText = "The zip code must consist of numbers only.";
            goodToGo = false;
            break;
        }
    }
    
    if (goodToGo) {
    personFacade.addPerson(person)
    .then(newPerson => {
      addStatus.style.color = "green";
      addStatus.innerText = "Person has been added. ID: " + newPerson.id;
      for (let i = 0; i < addFormElems.length; i++) {
          addFormElems.item(i).value = "";
      }
    })
    .catch(e => {
      printError(e, addStatus);
    });
  }});
  
  
  document.getElementById("tbody").addEventListener("click", function(e) {
      switch(e.target.innerText) {
          case "delete":
              deletePerson(e);
              break;
          case "edit":
              document.getElementById("editPerson").removeEventListener("click", edit);
              editPerson(e);
              break;
      }
  });
  
  function deletePerson(e) {
      let selectedAction = document.getElementById(e.target.id);
      let actualId = selectedAction.id.substring('d'.length);
      let delStatus = document.getElementById("deletedInfo");
      personFacade.deletePerson(actualId)
        .then(person => {
            let msg = `You deleted ${person.firstName} (ID: ${person.id}).`;
            delStatus.innerText = msg;
            removeStatusText(delStatus, 5000);
            getAll();
      }) 
        .catch(err => {
            printError(err, delStatus);
      });
  }
  
let editFormElems = document.getElementById("editForm").elements;
let editStatus = document.getElementById("editPersonStatus");

document.getElementById("editForm").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.getElementById("editPerson").click();
  }
})
  
function getPerson(id) {
    personFacade.getPerson(id)
     .then(function(person) {
      editFormElems.namedItem("eFname").value = person.firstName;
      editFormElems.namedItem("eLname").value = person.lastName;
      editFormElems.namedItem("ePhone").value = person.phone;
      editFormElems.namedItem("eStreet").value = person.street;      
      editFormElems.namedItem("eZip").value = person.zip; 
      editFormElems.namedItem("eCity").value = person.city; 
    });
}

    let actualId;

  function editPerson(e) {
    editStatus.innerText = "";
    let selectedAction = document.getElementById(e.target.id);
    actualId = selectedAction.id.substring('e'.length);
    getPerson(actualId); 
    document.getElementById("editPerson").addEventListener("click", edit);

}

      var edit = function() {
      let goodToGo = true;
      getPerson(actualId); 
            let person = {
            id : actualId,
            firstName : editFormElems.namedItem("eFname").value,
            lastName : editFormElems.namedItem("eLname").value,
            phone : editFormElems.namedItem("ePhone").value,
            street : editFormElems.namedItem("eStreet").value,
            zip : editFormElems.namedItem("eZip").value,
            city : editFormElems.namedItem("eCity").value
          };
            for (const [key, value] of Object.entries(person)) {
              editStatus.style.color = "red";
                if (value.length < 1) {
                    editStatus.innerText = "You forgot to enter something in one of the fields. All are required.";
                    goodToGo = false;
                    break;
                } else if (key === "zip" && isNaN(value)) {
                    editStatus.innerText = "The zip code must consist of numbers only.";
                    goodToGo = false;
                    break;
                } else {
                    goodToGo = true;
                }
            }
            if (goodToGo) {
            personFacade.editPerson(person)
                .then(editedPerson => {
                    editStatus.style.color = "green";
                    editStatus.innerText = `${editedPerson.firstName} has been updated. Reload to see all of the changes.`;
                    for (let i = 0; i < editFormElems.length; i++) {
                        editFormElems.item(i).value = "";
                    }
                }).catch(err => {
                    printError(err, editStatus);
                });
            } 
        }
  
  // Helper function for printing errors
function printError(promise, element) {
  promise.fullError.then(function(error) {
    element.innerText = `${error.code} : ${error.message}`;
  })}

// Helper function for removing status text after a while
function removeStatusText(textElement, duration) {
    setTimeout(function() {
      textElement.innerText = "";
    }, duration);
  }