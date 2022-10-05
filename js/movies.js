

//https://glitch.com/second-workable-airship

const booksURL = "https://second-workable-airship.glitch.me/books";

const moviesURL = "https://second-workable-airship.glitch.me/movies";

//The R in CRUD: Read
function getMovies(){
    fetch(moviesURL).then(response => response.json().then(data => console.log(data)))
}

getMovies();

// The C in CRUD: Create:
const booktoPost = {
    title: "Hello",
    author: {
        firstName: "Ralph",
        lastName: "Mason"
    }
}

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(booktoPost)
}

function getBooks(){
    fetch(booksURL).then(response => response.json().then(data => console.log(data)))
}


// let modification = {
//     title: "Hello, again"
// }

// const patchOptions = {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(modification)
// }

// fetch(booksURL + '/1', patchOptions).then(getBooks);
//
// modification = {
//     title: "Goodbye",
//     author: {
//         firstName: "John",
//         lastName: "Mason"
//     }
// }
//
// const putOptions = {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(modification)
// }
//
// fetch(booksURL + '/1', putOptions).then(getBooks);
//
// // The D in CRUD -- Delete
// const deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type' : 'application/json'
//     }
// }
// fetch(booksURL + '/1', deleteOptions).then(getBooks);