import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import { UserContext } from "../../contexts/auth";
import { useEffect, useContext } from "react";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav class="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <li className="nav-auth" id="login">
              <Link to="/signup">Registrar</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li className="nav-auth" id="profile">
              <Link to="/perfil">Perfil</Link>
            </li>
            <li onClick={()=>logout()} className="nav-auth" id="logout">
              <Link to="/">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
