import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home";
import Receita from "../pages/Receita";
import DetalharReceita from "../pages/DetalharReceita";
import RegistrarReceita from "../pages/RegistrarReceita";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Perfil from "../pages/Perfil";
import Navbar from "../componentes/Navbar";

export default function RouterApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/receita" Component={Receita} />
        <Route exact path="/registrar-receita" Component={RegistrarReceita} />
        <Route exact path="/detalhar-receita/:id" Component={DetalharReceita} />
        <Route exact path="/signin" Component={SignIn} />
        <Route exact path="/signup" Component={SignUp} />
        <Route exact path="/perfil" Component={Perfil} />
      </Routes>
    </>
  );
}
