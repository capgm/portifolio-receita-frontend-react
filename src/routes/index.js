import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "../pages/Home";
import Receita from "../pages/Receita";
import DetalharReceita from "../pages/DetalharReceita";
import RegistrarReceita from "../pages/RegistrarReceita";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Perfil from "../pages/Perfil";
import Navbar from "../componentes/Navbar";
import Private from "./Private";

export default function RouterApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/*  Component={Home} *//>
        <Route exact path="/receita" element={<Private><Receita/></Private>}/>
        <Route exact path="/registrar-receita" element={<Private><RegistrarReceita/></Private>}/>
        <Route exact path="/detalhar-receita/:id" element={<Private><DetalharReceita/></Private>}/>
        <Route exact path="/signin" Component={SignIn} />
        <Route exact path="/signup" Component={SignUp} />
        <Route exact path="/perfil" element={<Private><Perfil/></Private>}/>
      </Routes>
    </>
  );
}
