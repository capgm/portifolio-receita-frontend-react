import { useState, createContext, useEffect } from "react";
import axios from "axios";
import getPath from "../utils/pathEnv";

export const DominioContext = createContext();

export default function DominioProvider({ children }) {
  const [colecaoCategoria,setColecaoCategoria] = useState([]);

  useEffect(() => {

    async function carregarCategorias() {
      axios
        .get(getPath() + "/categorias")
        .then((categorias) => {
          if (categorias.data.length > 0) {
            let list = [];
            let obj = null;

            for (let i = 0; i < categorias.data.length; i++) {
              obj = {};

              obj.id = categorias.data[i]._id;
              obj.categoria = categorias.data[i].categoria;

              list.push(obj);
            }
            setColecaoCategoria(list);
          } else {
            setColecaoCategoria([]);
          }
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    carregarCategorias();
  }, []);

  return (
    <DominioContext.Provider
      value={{
        colecaoCategoria,
        setColecaoCategoria
      }}
    >
      {children}
    </DominioContext.Provider>
  );
}
