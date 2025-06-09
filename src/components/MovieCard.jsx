
import { useMovieContext } from '../context/MovieContext';
import '../css/MovieCard.css'

function MovieCard({movie}) {

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(event) {
    event.preventDefault();
    
    if (favorite) {
      removeFromFavorites(movie.id);
      console.log(`Removed from favorites: ${movie.title}`);
    } else {
      addToFavorites(movie);
      console.log(`Added to favorites: ${movie.title}`);
    }
    
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.alt} />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>❤︎</button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard