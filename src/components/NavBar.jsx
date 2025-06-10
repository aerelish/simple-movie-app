import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

import '../css/NavBar.css'

function NavBar() {

  const { setHome } = useMovieContext();
  
  const setHomeComponent = () => {
    setHome(true);
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={ setHomeComponent }>Movie App</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link" onClick={ setHomeComponent } >Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  )
}

export default NavBar