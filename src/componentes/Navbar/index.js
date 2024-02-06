import { Link, NavLink } from "react-router-dom";
import "./nav.css";

export default function Navbar() {
  return (
    <nav class="navbar">
      <ul>
        <li>
        <Link to="/">
          Home
        </Link>
        </li>
        <li>
        <Link to="/signin">
        Login
        </Link>
        </li>
        <li className="nav-auth" id="login">
        <Link to="/signup">
        Registrar
        </Link>
        </li>
        <li className="nav-auth" id="profile">
        <Link to="/detalhar-usuario">
          Perfil
        </Link>
        </li>
        <li className="nav-auth" id="logout">
        <Link to="/">
          Logout
        </Link>
        </li>
      </ul>
    </nav>
  );
}
