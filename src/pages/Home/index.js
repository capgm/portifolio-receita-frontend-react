import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import image from "../../imagens/imagem.png";
import { UserContext } from "../../contexts/auth";

export default function Home() {
  const [campoConsulta, setCampoConsulta] = useState('');
  const [respostaConsulta, setRespostaConsulta] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('-1');
  const {colecaoCategoria} = useContext(UserContext);

  async function buscar(e) {
    e.preventDefault();
    await axios
      .get("http://localhost:8080/receitas/consulta/" + categoria + "/" + campoConsulta)
      .then((receitas) => {
        if (receitas.data.length > 0) {
          setRespostaConsulta(receitas.data);
        } else {
          setRespostaConsulta([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
    <div className="bloco-consulta">
    <img className="imagem-principal" src={image} />
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          value={campoConsulta}
          onChange={(e) => setCampoConsulta(e.target.value)}
          placeholder="Digite o nome da receita"
        />
        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
          }}
        >
          <option value={-1}>Selecione uma categoria</option>
          {colecaoCategoria.map((categoria, index) => {
            return (
              <option key={index} value={categoria.id}>
                {categoria.categoria}
              </option>
            );
          })}
        </select>
        <button onClick={(e) => buscar(e)}>Buscar</button>
      </div>
    </div>

      <main>
        <div className=".recipe-card">
          <div className="grid-container">
            {respostaConsulta.map((receitas, index) => {
              return (
                <section key={index} id="recipeList">
                  <Link
                    to={`/detalhar-receita/${encodeURIComponent(receitas._id)}`}
                  >
                    <div className="grid-item">{receitas.nome}</div>
                  </Link>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
