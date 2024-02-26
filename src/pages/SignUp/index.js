import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import getPath from "../../utils/pathEnv";


const schema = z.object({
  nome: z
    .string()
    .min(5, "O nome deve ter no mínimo 5 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  senha: z.string().min(8, "A senha deve ter no minimo 8 caracteres."),
  senhavalidacao: z.string().min(8, "A senha deve ter no minimo 8 caracteres."),
  email: z.string().min(5, "O e-mail deve ter no minimo 7 caracteres."),
});

export default function SignUp() {
  const { login } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function registrar(data) {
    const usuario = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    };

    await axios
      .post(getPath() + "/signup", usuario)
      .then((resposta) => {
        console.log(resposta);
        if (resposta.data.sucesso) {
          login({
            email: data.email,
            senha: data.senha,
          });
          toast.success(resposta.data.msg);
        } else {
          toast.error(resposta.data.msg);
        }
      })
      .catch((erro) => {
        toast.error("Ocorreu algum erro!");
        console.log(erro);
      });
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit(registrar)}>
          <label name="">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu Nome"
            {...register("nome")}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}

          <label name="">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu.email@example.com"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label name="">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="******"
            {...register("senha")}
          />
          {errors.senha && <p className="error">{errors.senha.message}</p>}

          <label name="">Digite a senha novamente:</label>
          <input
            type="password"
            id="senhavalidacao"
            name="senhavalidacao"
            placeholder="******"
            {...register("senhavalidacao")}
          />
          {errors.senhavalidacao && (
            <p className="error">{errors.senhavalidacao.message}</p>
          )}

          <button>Registar</button>
        </form>
      </div>
    </>
  );
}
