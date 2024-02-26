import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import { UserContext } from '../../contexts/auth'

export default function SignIn() {
  const [nome, setNome] = useState();
  const [id, setID] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [urlImagemProfile, setUrlImagemProfile] = useState();
  const {login, user, setUser} = useContext(UserContext)

  const navigate = useNavigate();

  function logar(e){
    e.preventDefault();
    login({
      email : email,
      senha : senha
    })
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu.email@example.com"
          required
        />

        <label for="name">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="********"
          required
        />

        <button onClick={(e) => logar(e)} type="submit">
          Entrar
        </button>
        <br />
      </form>
    </div>
  );
}
