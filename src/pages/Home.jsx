import { useState, useEffect } from "react"
import { getPopularMovies, fetchMovies } from "../services/api"
import { useMovieContext } from '../context/MovieContext'

import "../css/Home.css"

import MovieCard from "../components/MovieCard"

function Home() {
  
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])

  const { home, setHome } = useMovieContext();

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)

    // logic for fetching movies based on search query with the API

    // if the search query is empty or loading is true, set an error message and return
    if (searchQuery.trim() === "") {
      setError("Please enter a search query")
      return
    } else if (loading) {
      setError("Loading, please wait...")
      return
    }

    setLoading(true)

    try {
      const searchResults = await fetchMovies(searchQuery)
      setMovies(searchResults)
      setError(null) // Clear any previous error
    } catch (error) {
      setError("Failed to search movies")
    } finally {
      setLoading(false)
      setHome(false) // set home to false when searching
    }

  }
  
  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies()
      setMovies(popularMovies)
    } catch (error) {
      console.error("Error fetching popular movies:", error)
      setError("Failed to load popular movies")
    } finally {
      console.log("Popular movies loaded")
      //await new Promise(r => setTimeout(r, 3000)); // Simulating a delay for loading effect
      setLoading(false)
    }
  } 
  
  useEffect(() => { loadPopularMovies() }, [])

  useEffect(() => { 
    if (home) {
      loadPopularMovies()
      setSearchQuery("") // reset search query when home is true
    } 
  }, [home])

  /* doing so will work however this will run every time the component renders
  const movies = getPopularMovies()
  */

  /*  doing so will allow us to test the component without needing to fetch data from the API.
  const movies = [
    {
      id: 1,
      title: "Inception",
      release_date: "2010-07-16",
      url: "https://image.tmdb.org/t/p/w500/8h58l2b3d5e.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      release_date: "2008-07-18",
      url: "https://image.tmdb.org/t/p/w500/9O7hn7v4y57kPzQ6n8a2b3d5c5e.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      release_date: "2014-11-07",
      url: "https://image.tmdb.org/t/p/w500/8h58l2b3d5e.jpg",
    }
  ]
  */
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          className="search-input" 
          type="text" 
          placeholder="Search for movies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      { // adding condition so that when there's an error will show error message
        error && <div className="error-message">{error}</div>
      }

      { // adding condition so that when it's loading will show loading
        loading ? 
        (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {
              movies.map(movie => (
                // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                //   <MovieCard key={movie.id} movie={movie}/> 
                // )
                <MovieCard key={movie.id} movie={movie}/>
              ))
            }
          </div>
        )
      }

      { // adding condition so that when there are no movies will show no movies message
        !error && !loading && movies.length === 0 && (
          <div className="no-movies">
            <h2>No Movies Found</h2>
          </div>
        )
      }

    </div>
  )
}

export default Home