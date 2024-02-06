import { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

export default function SignUp() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [senhaValidacao, setSenhaValidacao] = useState();
  const [urlImagemProfile, setUrlImagemProfile] = useState();

  const resposeGoogle = async (resposta) => {
    const {
      profileObj: { name, email, imageUrl },
    } = resposta;

    setNome(name);
    setEmail(email);
    setUrlImagemProfile(imageUrl);

    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };

    await axios
      .post("http://localhost:8080/signup", usuario)
      .then((resposta) => {
        console(resposta);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  function failure() {}

  async function registrar(e) {
    e.preventDefault();
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };

    await axios
      .post("http://localhost:8080/signup", usuario)
      .then((resposta) => {
        console(resposta);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <label for="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu Nome"
            required
          />

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

          <label for="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="******"
            required
          />

          <label for="senha">Digite a senha novamente:</label>
          <input
            type="password"
            id="senhavalidacao"
            name="senhavalidacao"
            value={senhaValidacao}
            onChange={(e) => setSenhaValidacao(e.target.value)}
            placeholder="******"
            required
          />

          <button onClick={(e) => registrar(e)}>Registar</button>
          <GoogleLogin
            clientId="723612424564-oh5q10rruh7eldiri4jdh2chs49s0c26.apps.googleusercontent.com"
            buttonText="Registar com o Google"
            onSuccess={resposeGoogle}
            onFailure={failure}
          />
        </form>
      </div>
    </>
  );
}
