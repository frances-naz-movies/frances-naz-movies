const moviesURL = "https://pyrite-steel-spot.glitch.me/movies";

function getMovies(){
    fetch(moviesURL).then(response => response.json().then(data => {
        function printMovies(data) {
            //==========For each to Loop through the movies and display them=============
            data.forEach((movies, i) => {
                console.log(data[i]);
                //=======This pushes out the movies and their info into cards====================
                $("#moviesOutput").append(`
                    <div class="card mb-3" style="max-width: 100%; background-color: #0b192f; border-radius: 60px; margin: 30px 30px">
                    ${ /* ========SVG for the delete button================== */'' }
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="deleteButton bi bi-trash" data-id="${data[i].id}" viewBox="0 0 16 16" style="position:absolute; margin-left: 520px; margin-top: 5px; color: white;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                       </svg>
                     ${ /* =======This is the edit button and it's modal============ */'' }
                    <div class="col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="editButton bi bi-pencil-square" data-edit-id="${data[i].id}" data-rating="${data[i].rating}" data-genre="${data[i].genre}" data-poster="${data[i].poster}" data-title="${data[i].title}" data-plot="${data[i].plot}" id="editSVG" viewBox="0 0 16 16" style="position:absolute; margin-left: 500px; margin-top: 5px; color: white;" data-bs-toggle="modal" data-bs-target="#editModal">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>             
                    <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${data[i].poster}" class="img-fluid rounded-start" alt="Movie Poster" style="width:500px; height:700px; border-radius: 30px">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body" style="color: white;">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].plot}</p>
                    <p class="card-text"><small class="text-muted">${data[i].genre}</small></p>
                    <p class="card-text"><small class="text-muted">Rating: ${data[i].rating}</small></p>
                    </div>
                    </div>
                    </div>
                    </div>
                  `);

            });

            $(".editButton").on('click', function(){
                //Declared movieID to for the values to show the editable text=========
                let movieID = $(this).attr("data-edit-id")
                $("#movie-title-edit").attr("value", $(this).attr("data-title"))
                $("#movie-plot-edit").attr("value", $(this).attr("data-plot"));
                $("#movie-rating-edit").attr("value", $(this).attr("data-rating"));
                $("#movie-genre-edit").attr("value", $(this).attr("data-genre"));
                $("#movie-poster-edit").attr("value", $(this).attr("data-poster"));
                //This makes the edit/submit button push and display the edited movies
                $("#addMovieSubmit-edit").on('click', function (e) {
                    e.preventDefault();
                    //Modification Object for the editing==================
                    let movieModification = {
                        title: $("#movie-title-edit").val(),
                        rating: $("#movie-rating-edit").val(),
                        genre:$("#movie-genre-edit").val(),
                        plot: $("#movie-plot-edit").val(),
                        poster: $("#movie-poster-edit").val(),
                    }

                    const patchOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(movieModification)

                    }
                    //This pushes the edited movies and displays them
                    fetch(moviesURL + "/" + movieID, patchOptions).then(function(){
                        $("#moviesOutput").empty();
                        getMovies();
                    });
                })
            })
        }
        printMovies(data);
        //=========================DELETE BUTTON====================================
        $(".deleteButton").on('click', function () {
            console.log($(this).attr("data-id"))

            const deleteOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
            fetch(moviesURL + "/" + $(this).attr("data-id"), deleteOptions).then(function(){
                $("#moviesOutput").empty();
                getMovies();
            })
        })
        //======================END OF DELETE BUTTON====================================

    }))
}

getMovies();

//=========================ADD A MOVIE==============================================
$("#addMovieSubmit").click(function(e){
    e.preventDefault();
//========================MovieToPOST Object=========================
    const movieToPOST = {
        title: $("#movie-title").val(),
        rating: $("#quantity").val(),
        genre:$("#movie-genre").val(),
        plot: $("#movie-plot").val(),
        poster: $("#movie-poster").val(),
    }

    $('#addMovieModal').modal('hide');

    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(movieToPOST)
    }
    function addMovie(){
        fetch(moviesURL, postOptions).then(response => response.json().then(data => {
            $("#moviesOutput").empty();
            getMovies()
        }))
    }
    addMovie();

})
//==================== END OF ADD A MOVIE===========================================