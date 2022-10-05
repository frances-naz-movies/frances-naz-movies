

//https://glitch.com/second-workable-airship

const booksURL = "https://second-workable-airship.glitch.me/books";

const moviesURL = "https://second-workable-airship.glitch.me/movies";

//The R in CRUD: Read
function getMovies(){
    fetch(moviesURL).then(response => response.json().then(data => {
        console.log(data)
        function printMovies(data) {
            data.forEach((movies, i) => {
                $("#moviesOutput").append(`
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${data[i].poster}" class="img-fluid rounded-start" alt="Movie Poster" style="width:200px; height:300px">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].plot}</p>
                    <p class="card-text"><small class="text-muted">${data[i].genre}</small></p>
                    <p class="card-text"><small class="text-muted">${data[i].rating}</small></p>
                  </div>
                </div>
              </div>
            </div>
                  `);
            });
        }
        printMovies(data);

    }))
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

const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.textContent = `New message to ${recipient}`
    modalBodyInput.value = recipient
})