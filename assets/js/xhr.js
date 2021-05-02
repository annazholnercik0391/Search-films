const apiKey = '90f5361d'
const siteUrl = `https://www.omdbapi.com/?apikey=${apiKey}`
let searchLast = ' ';

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (!json || !json.Search) throw Error('Сервер вернул неправильный объект');
    return json.Search;
  })

inputSearch.addEventListener('keyup', (e) => {
  const searchString = e.target.value;

  delay(() => {
    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup();
      getData(`${siteUrl}&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err));
    }
    searchLast = searchString.trim();
  }, 2000);
})

