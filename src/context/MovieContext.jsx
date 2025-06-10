
import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// children is reserved prop when writing a component
// anything inside the MovieProvider component will be passed as children
export const MovieProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);
  const [home, setHome] = useState(true);

  // gets stored favorites from localStorage when the component mounts
  // converts localStorage data which is in type string to JSON object using JSON.parse
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // update localStorage whenever favorites state changes
  useEffect(() => {  
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    // using spread operator to create a new array with the existing favorites and the new movie
    // this ensures that we do not mutate the state directly
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  }
  
  const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieId));
  }

  const isFavorite = (movieId) => {
    // tells if a movie is in the favorites list
    // returns true if the movie with the given id is in the favorites list, otherwise false
    return favorites.some(movie => movie.id === movieId);
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    home,
    setHome,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

