import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import Formulario from "../components/Formulario";

function Login() {
    const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/usuario/login", {
        username,
        senha,
      });

      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/")
    } catch (error) {
      console.log(error);
      alert("Acesso não autorizado! Username ou senha incorretos.")
    }
  };

  return (
    <Background>
      <Conteudo>
        <div className="flex justify-center">
          <h1 className="text-2xl">Login</h1>
        </div>
        <div className="">
          <Formulario onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="bg-white rounded-md p-2"
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="senha">Senha:</label>
            <input
              className="bg-white rounded-md p-2"
              type="password"
              id="senha"
              name="senha"
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-olive-700 p-1 rounded-md uppercase"
            >
              Login
            </button>
          </Formulario>
        </div>
      </Conteudo>
    </Background>
  );
}

export default Login;
