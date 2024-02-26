import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./receita.css";
import axios from "axios";
import { UserContext } from "../../contexts/auth";
import { DominioContext } from "../../contexts/dominio";
import getPath from "../../utils/pathEnv";

export default function Receita() {
  const [idReceita, setIdReceita] = useState();
  const [nome, setNome] = useState();
  const [categoria, setCategoria] = useState();
  const [ingredientes, setIngredientes] = useState();
  const [modoPreparo, setModoPreparo] = useState();
  const [receitas, setReceitas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [index, setIndex] = useState();
  const {colecaoCategoria} = useContext(DominioContext);

  
  useEffect(() => {
    async function carergarReceitas() {
      await axios
        .get(getPath() + "/receitas")
        .then((receitas) => {
          if (receitas.data.length > 0) {
            setReceitas(receitas.data);
          } else {
            setReceitas([]);
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    carergarReceitas();
  }, []);

  useEffect(() => {
    async function carergarCategorias() {
      await axios
        .get(getPath() + "/categorias")
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

    carergarCategorias();
  }, []);

  async function incluir(data) {
    const objInclusao = {
      nome: data.nome,
      categoria: data.categoria,
      ingredientes: data.ingredientes,
      modoPreparo: data.modoPreparo,
      id: data.idReceita,
    };

    console.log(objInclusao);

    await axios
      .post(getPath() + "/receitas", objInclusao)
      .then(() => {
        receitas.push(objInclusao);
        setNome("");
        setCategoria("");
        setIngredientes("");
        setModoPreparo("");
        setReceitas(receitas);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function edit(receita, index, e) {
    e.preventDefault();
    setNome(receita.nome);
    setCategoria(receita.categoria);
    setIngredientes(receita.ingredientes);
    setModoPreparo(receita.modoPreparo);
    setIdReceita(receita._id);
    setIndex(index);
  }

  async function confirmarEdicao() {
    const objAlteracao = {
      nome: nome,
      categoria: categoria,
      ingredientes: ingredientes,
      modoPreparo: modoPreparo,
      _id: idReceita,
    };

    console.log(objAlteracao);
    console.log(idReceita);

    await axios
      .put(getPath() + "/receitas/" + idReceita, objAlteracao)
      .then(() => {
        const lista = receitas;

        lista[index] = objAlteracao;
        setReceitas(lista);
        setNome("");
        setCategoria("");
        setIngredientes("");
        setModoPreparo("");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  async function deletar(receita, e) {
    e.preventDefault();

    await axios
      .delete(getPath() + "/receitas/" + receita._id)
      .then(() => {
        const lista = receitas.filter((objeto) => {
          return (
            objeto.nome !== receita.nome &&
            objeto.categoria !== receita.categoria &&
            objeto.ingredientes !== receita.ingredientes &&
            objeto.modoPreparo !== receita.modoPreparo
          );
        });
        setReceitas(lista);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function botaoVoltar() {
    setNome("");
    setCategoria("");
    setIngredientes("");
    setModoPreparo("");
    setIdReceita("");
  }

  return (
    <div>
      <header>
        <h1>Cadastro de Receitas Culinárias</h1>
      </header>

      <main>
        <form id="recipeForm">
          <label for="categoria">Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label for="categoria">Categoria:</label>
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

          <label for="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            rows="4"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
          ></textarea>

          <label for="modoPreparo">Modo de Preparo:</label>
          <textarea
            id="modoPreparo"
            name="modoPreparo"
            value={modoPreparo}
            onChange={(e) => setModoPreparo(e.target.value)}
            rows="6"
            required
          ></textarea>
        </form>
        <div className="div-button">
          <button className="button-incluir" onClick={() => confirmarEdicao()}>
            Incluir Receita
          </button>
          <Link to="/">
            <button className="button-voltar">Voltar</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
