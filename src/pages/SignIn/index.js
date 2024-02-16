import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import { toast } from "react-toastify";

export default function SignIn() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [urlImagemProfile, setUrlImagemProfile] = useState();

  const navigate = useNavigate();

  const resposeGoogle = async (resposta) => {
    
    console.log(resposta)

    const {
      profileObj: { name, email, imageUrl },
    } = resposta;
    
    console.log(resposta.profileObj)

    setNome(name);
    setEmail(email);
    setUrlImagemProfile(imageUrl);

    const objSignin = {
      email: email,
      senha: senha,
    };

    navigate("/")

    await axios.post("https://receitas-back-lzdb.onrender.com/signin",objSignin).then((resposta)=>{
        console.log(resposta);
    }).catch((erro)=>{
        console.log(erro)
    });

  };

  async function logar(e) {
    e.preventDefault()

    const objSignin = {
      email: email,
      senha: senha,
    };

  await axios.post("https://receitas-back-lzdb.onrender.com/signin",objSignin).then((user)=>{
        localStorage.setItem("@UserContext", JSON.stringify(user.data));
        toast.success("Bem-vindo(a) de volta!")
        navigate("/")
    }).catch((erro)=>{
        console.log(erro)
    });
  }

  function resposeGoogleFailure(error) {
    toast.error(error)
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
        <br/>
      </form>
    </div>
  );
}
