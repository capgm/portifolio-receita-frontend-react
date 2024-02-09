import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./receita.css";
import axios from "axios";
import Home from "../Home";

export default function DetalharReceita({ match }) {
  const [idReceita, setIdReceita] = useState();
  const [nome, setNome] = useState();
  const [categoria, setCategoria] = useState();
  const [ingredientes, setIngredientes] = useState();
  const [modoPreparo, setModoPreparo] = useState();
  const [receita, setReceita] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [index, setIndex] = useState();
  const [inEdicao, setInEdicao] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function carergarReceitas() {
      const idReceita = decodeURIComponent(id);
      setIdReceita(idReceita);

      await axios
        .get("http://receitas-back-lzdb.onrender.com/receita/" + idReceita)
        .then((receita) => {
          console.log(receita);
          if (receita) {
            setReceita(receita.data);
            setNome(receita.data.nome);
            setCategoria(receita.data.categoria);
            setIngredientes(receita.data.ingredientes);
            setModoPreparo(receita.data.ingredientes);
          } else {
            setReceita({});
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    carergarReceitas();
  }, [id]);

  return (
    <div>
      <header>
        <h1>Detalhamento da Receita</h1>
      </header>

      <main>
        <form id="recipeForm">
          <label for="Nome">Nome:</label>
          <input id="nome" name="nome" value={nome} disabled/>
          <label for="categoria">Categoria:</label>
          <input id="categoria" name="categoria" value={categoria} disabled />
          <label for="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            rows="4"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            disabled
          ></textarea>

          <label for="modoPreparo">Modo de Preparo:</label>
          <textarea
            id="modoPreparo"
            name="modoPreparo"
            value={modoPreparo}
            onChange={(e) => setModoPreparo(e.target.value)}
            rows="6"
            disabled
          ></textarea>
          <Link to="/" >
            <button>Voltar</button>
          </Link>
        </form>
      </main>
    </div>
  );
}
