//https://glitch.com/second-workable-airship

const moviesURL = "https://second-workable-airship.glitch.me/movies";

//The R in CRUD: Read

function getMovies(){
    fetch(moviesURL).then(response => response.json().then(data => {
        console.log(data)
        function printMovies(data) {
            data.forEach((movies, i) => {
                $("#moviesOutput").append(`
            <div class="card mb-3" style="max-width: 540px;">
            <svg id="deleteButton" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="position:absolute; margin-left: 520px; margin-top: 5px">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
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

$("#addMovieSubmit").click(function(e){
    e.preventDefault();

    const movieToPOST = {
        title: $("#movie-title").val(),
        rating: $("#movie-rating").val(),
        genre:$("#movie-genre").val(),
        plot: $("#movie-plot").val(),
    }

    $('#exampleModal').modal('hide');

    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPOST)
    }
    function addMovie(){
        fetch(moviesURL, postOptions).then(response => response.json().then(data => getMovies()))
    }
    addMovie();

})

    $("#deleteButton").on('click', function () {
        alert("It worked!")
    })