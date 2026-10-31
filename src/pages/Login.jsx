import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import Formulario from "../components/Formulario";
import Botao from "../components/Botao";
import Input from "../components/Input";
import Label from "../components/Label";

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
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Label htmlFor="senha">Senha:</Label>
            <Input
              type="password"
              id="senha"
              name="senha"
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
            <Botao type="submit">
              Login
            </Botao>
          </Formulario>
        </div>
      </Conteudo>
    </Background>
  );
}

export default Login;
