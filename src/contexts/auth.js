import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  bcrypt from "bcryptjs";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@UserContext");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        //setLoading(false);
      }
      //setLoading(false);
    }

    loadUser();
  }, []);

  async function login(usuario) {
    //e.preventDefault();
    console.log(usuario);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(usuario.senha, salt, async (err, hash) => {
        if (err) {
          console.error("Erro ao criar a hash:", err);
        } else {
          const objSignin = {
            email: usuario.email,
            senha: hash,
          };

          await axios
            .post("http://localhost:8080/signin", objSignin)
            .then((user) => {
              localStorage.setItem("@UserContext", JSON.stringify(user.data));
              setUser(user.data);
              toast.success("Usuário logado");
              navigate("/");
            })
            .catch((erro) => {
              console.log(erro);
            });
        }
      });
    });
  }

  async function logout() {
    //e.preventDefault();

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
