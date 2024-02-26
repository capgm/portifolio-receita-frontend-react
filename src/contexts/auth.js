import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getPath from "../utils/pathEnv";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);  
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

  async function login(usuario) {
    const objSignin = {
      email: usuario.email,
      senha: usuario.senha,
    };

    await axios
      .post(getPath() + "/signin", objSignin)
      .then((user) => {
        console.log(user);
        if (user.data.islogado) {
          console.log(user.data.user);
          localStorage.setItem("@UserContext", JSON.stringify(user.data.user));
          setUser(user.data.user);
          toast.success("Usuário logado");
          navigate("/");
        } else {
          if (user.data.mensagem !== "") {
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

  return (
    <UserContext.Provider
      value={{
        islogado: !!user,
        user: user,
        setUser,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
