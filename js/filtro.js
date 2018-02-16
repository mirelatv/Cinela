$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });

  var Favoritos = firebase.database().ref();

firebase.database().ref('users/').once('value').then(function(snapshot) {
  $('#btnAdd').click(function() {
    alert('aaa');
    Favoritos.set({
      Pelicula: movies.Title,
    });
  });
});
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com?s=' + bbbbb + '&apikey=87651d90&type=movie')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col m4 s12 contImage">
            <div  class="well text-center hoverable " >
              <img class="imgSize"  src="${movie.Poster}">
              <i class="add"></i>
              <h5 class=" center-align">${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class=" waves-effect waves-light btn modal-trigger" href="#modal1">Movie Details</a>
              </div>
          </div>
           `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  /* window.location = 'movie.html';*/
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=87651d90&type=movie')
    .then((response) => {
      console.log(response.data);
      let movie = response.data;
      $('#peli-genero').text(movie.Genre);
      $('#peli-Released').text(movie.Released);
      $('#peli-Rated').text(movie.Rated);
      $('#peli-Rating').text(movie.imdbRating);
      $('#peli-Director').text(movie.Director);
      $('#peli-Writer').text(movie.Writer);
      $('#peli-Year').text(movie.Year);
    })
    .catch((err) => {
      console.log(err);
    });
}

