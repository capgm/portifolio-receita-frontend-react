import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { UserContext } from "../../contexts/auth";
import "./receita.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import getPath from "../../utils/pathEnv";

const schema = z.object({
  nome: z
    .string()
    .min(5, "O nome deve ter no inimo 5 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  ingredientes: z
    .string()
    .min(5, "O ingrediente deve ter no inimo 20 caracteres."),
  modoPreparo: z
    .string()
    .min(5, "O modo de preparo deve ter no inimo 5 caracteres."),
  categoria: z.string().min(3, "Selecione uma categoria válida.")
});

export default function Receita() {
  const [receitas, setReceitas] = useState([]);
  const [categoria, setCategoria] = useState();
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { user } = useContext(UserContext);

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
  }, [user]);

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
    
    console.log(data)

    const objInclusao = {
     nome : data.nome,
     id_categoria: data.categoria,
     ingredientes: data.ingredientes,
     modoPreparo: data.modoPreparo,
     id_usuario: user._id,
    };

    console.log(user._id);
    console.log(objInclusao);

    await axios
      .post(getPath() + "/receitas", objInclusao)
      .then(() => {
        receitas.push(objInclusao);
        /*
        setCategoria("");
        setIngredientes("");
        setModoPreparo("");
        setReceitas(receitas);
        */
        toast.success("Receita incluida com sucesso");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
  /*
  function edit(receita, index, e) {
    e.preventDefault();
    setCategoria(receita._id);
    setIngredientes(receita.ingredientes);
    setModoPreparo(receita.modoPreparo);
    setIdReceita(receita._id);
    setIndex(index);
    setInEdicao(true);
  }

  async function confirmarEdicao() {
    const objAlteracao = {
      categoria: categoria,
      ingredientes: ingredientes,
      modoPreparo: modoPreparo,
      _id: idReceita,
    };

    console.log(objAlteracao);
    console.log(idReceita);

    await axios
      .put("http://localhost:8080/receitas/" + idReceita, objAlteracao)
      .then(() => {
        const lista = receitas;

        lista[index] = objAlteracao;
        setReceitas(lista);

        setCategoria("");
        setIngredientes("");
        setModoPreparo("");
        setInEdicao(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  async function deletar(receita, e) {
    e.preventDefault();

    await axios
      .delete("http://localhost:8080/receitas/" + receita._id)
      .then(() => {
        const lista = receitas.filter((objeto) => {
          return (
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

  function botaoVoltar(){
    setNome("");
    setCategoria("");
    setIngredientes("");
    setModoPreparo("");
    setIdReceita("");
    setInEdicao(false);
  }
*/
  return (
    <div>
      <header>
        <h1>Cadastro de Receitas Culinárias</h1>
      </header>

      <main>
        <form id="recipeForm" onSubmit={handleSubmit(incluir)}>
          <label for="ingredientes">Nome:</label>
          <input type="text" id="nome" name="nome" {...register("nome")} />
          {errors.nome && <p className="error">{errors.nome.message}</p>}

          <label for="categoria">Categoria:</label>
          <select
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
            id="categoria"
            {...register("categoria")}
          >
            <option value={-1}>Selecione uma categoria</option>
            {categorias.map((categoria, index) => {
              return (
                <option key={index} value={categoria._id}>
                  {categoria.categoria}
                </option>
              );
            })}
          </select>
          {errors.categoria && (
            <p className="error">{errors.categoria.message}</p>
          )}

          <label for="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            rows="6"
            {...register("ingredientes")}
          ></textarea>
          {errors.ingredientes && (
            <p className="error">{errors.ingredientes.message}</p>
          )}

          <label for="modoPreparo">Modo de Preparo:</label>
          <textarea
            id="modoPreparo"
            name="modoPreparo"
            rows="6"
            {...register("modoPreparo")}
          ></textarea>
          {errors.modoPreparo && (
            <p className="error">{errors.modoPreparo.message}</p>
          )}
          <button className="button-incluir">
            Cadastrar Receita
          </button>
        </form>
        {/*inEdicao ? (
          <div className="div-button">
            <button
              className="button-incluir"
              onClick={() => confirmarEdicao()}
            >
              Alterar Receita
            </button>
            <button
              className="button-voltar"
              onClick={() => botaoVoltar()}
            >
              Voltar
            </button>
          </div>
        ) : (
          <button className="button-incluir" onClick={() => incluir()}>
            Cadastrar Receita
          </button>
        )*/}
      </main>

      {/*receitas.map((receita, index) => {
        return (
          <main key={index}>
            <div>
              <form id="recipeForm">
                <label for="categoria">Categoria:</label>
                <input
                  type="text"
                  id="categoria"
                  value={receita.categoria}
                  name="categoria"
                  disabled
                />

                <label for="ingredientes">Ingredientes:</label>
                <textarea
                  id="ingredientes"
                  name="ingredientes"
                  rows="4"
                  value={receita.ingredientes}
                  disabled
                ></textarea>

                <label for="modoPreparo">Modo de Preparo:</label>
                <textarea
                  id="modoPreparo"
                  name="modoPreparo"
                  value={receita.modoPreparo}
                  rows="6"
                  disabled
                ></textarea>
                <div className="div-button">
                  <button
                    className="button-alteracao"
                    onClick={(e) => edit(receita, index, e)}
                  >
                    Editar Receita
                  </button>
                  <button
                    className="button-excluir"
                    onClick={(e) => deletar(receita, e)}
                  >
                    Excluir Receita
                  </button>
                </div>
              </form>
            </div>
          </main>
        );
      }
      )
      */}
    </div>
  );
}
