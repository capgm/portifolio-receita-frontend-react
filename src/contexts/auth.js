import { useState, useTransition, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@UserContext");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(email, password){

    const objSignin = {
      email: email,
      senha: password,
    };

    await axios.post("https://localhost:8080/signin",objSignin).then((user)=>{

        setUser(user.data)
        localStorage.setItem("@UserContext", JSON.stringify(user.data));
        toast.success("Bem-vindo(a) de volta!")
        navigate("/")
    }).catch((erro)=>{
        console.log(erro)
        toast.error("Ops algo deu errado!");
    });
  }


  // Cadastrar um novo user
  async function signUp(email, password, name){
   

    const usuario = {
      nome: name,
      email: email,
      senha: password,
    };

    await axios
      .post("https://localhost:8080/signup", usuario)
      .then((resposta) => {
        setUser(resposta.data)
        storageUser(resposta.data);
        toast.success("Seja bem-vindo ao sistema!")
        navigate("/dashboard")
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function storageUser(data){
    localStorage.setItem('@DataUser', JSON.stringify(data))
  }

  async function logout(){
    localStorage.removeItem('@DataUser');
    setUser(null);
  }

  const [idReceita, setIdReceita] = useState(null);
  return (
    <UserContext.Provider
      value={{
        islogado : !!user,
        user,
        signIn,
        signUp,
        storageUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
