import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [colecaoCategoria, setColecaoCategoria] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@UserContext");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function carregarCategorias() {
      axios
        .get("http://localhost:8080/categorias")
        .then((categorias) => {
          if (categorias.data.length > 0) {
            let list = [];
            let obj = null;

            for(let i = 0; i < categorias.data.length;i++){
              obj = new Object();
             
              obj.id = categorias.data[i]._id;
              obj.categoria = categorias.data[i].categoria;

              list.push(obj);
            }

            console.log(list)
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

  async function login(usuario) {
    const objSignin = {
      email: usuario.email,
      senha: usuario.senha,
    };

    await axios
      .post("http://localhost:8080/signin", objSignin)
      .then((user) => {
        console.log(user);
        if (user.data.islogado) {
          console.log(user.data.user);
          localStorage.setItem("@UserContext", JSON.stringify(user.data.user));
          setUser(user.data.user);
          toast.success("Usuário logado");
          navigate("/");
        } else {
          if (user.data.mensagem != "") {
            toast.error(user.data.mensagem);
          }
          toast.error("Senha ou e-mail, errados!");
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  async function logout() {
    localStorage.removeItem("@UserContext");
    setUser(null);
    toast.info("Usuario deslogando...");
  }

  const [idReceita, setIdReceita] = useState(null);
  return (
    <UserContext.Provider
      value={{
        islogado: !!user,
        user: user,
        setUser,
        login,
        logout,
        colecaoCategoria,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
