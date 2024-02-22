import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import image from "../../imagens/imagem.png";

export default function Home() {
  const [campoConsulta, setCampoConsulta] = useState();
  const [respostaConsulta, setRespostaConsulta] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState();

  useEffect(() => {
    async function carregarCategorias() {
      axios
        .get("http://localhost:8080/categorias")
        .then((categorias) => {
          if (categorias.data.length > 0) {
            setCategorias(categorias.data);
          } else {
            setCategorias([]);
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    carregarCategorias();
  }, []);

  async function buscar(e) {
    e.preventDefault();
    await axios
      .get("http://localhost:8080/receitas/consulta/" + categoria)
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
          {categorias.map((categoria, index) => {
            return (
              <option key={index} value={categoria.categoria}>
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
