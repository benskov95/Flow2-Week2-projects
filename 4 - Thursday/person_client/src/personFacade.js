const URL = "https://bencat.dk/pclient/api/person";

function getAllPersons() {
    let diffUrl = `${URL}/all`;
    return fetch(diffUrl)
    .then(res => res.json());
}

function getPerson(id) {
    let byID = `${URL}/get/${id}`;
    return fetch(byID)
    .then(handleHttpErrors);
}

function addPerson(person) {
    const options = makeOptions("POST", person);
    let diffUrl = `${URL}/add`;
    return fetch(diffUrl, options)
    .then(handleHttpErrors);
}

function editPerson(person) {
    const options = makeOptions("PUT", person);
    let byID = `${URL}/edit/${person.id}`;
    return fetch(byID, options)
    .then(handleHttpErrors);
}

function deletePerson(id) {
    const options = makeOptions("DELETE");
    let byID = `${URL}/delete/${id}`;
    return fetch(byID, options)
    .then(handleHttpErrors);
}

const personFacade = {
    getAllPersons,
    getPerson,
    addPerson,
    editPerson,
    deletePerson
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;