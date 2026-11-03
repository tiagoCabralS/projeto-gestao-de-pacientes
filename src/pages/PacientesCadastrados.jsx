import axios from "axios";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import Li from "../components/Li";
import PacientesBotao from "../components/PacientesBotao";

function PacientesCadastrados() {
  const [pacientesCadastrados, setPacientesCadastrados] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/paciente/all").then(({ data }) => {
      setPacientesCadastrados(data);
    });
  }, []);

  return (
    <Background>
      <Conteudo>
        <ul className="grid grid-cols-1 space-y-2">
          <Li>
            <PacientesBotao className=" w-1/12">ID</PacientesBotao>
            <PacientesBotao className=" w-full">Nome</PacientesBotao>
            <PacientesBotao className=" w-1/4">Telefone</PacientesBotao>
            <PacientesBotao className=" w-1/12"></PacientesBotao>
          </Li>
          {pacientesCadastrados.map((paciente) => (
            <Li key={paciente.id}>
              <PacientesBotao className=" w-1/12">
                {paciente.id}
              </PacientesBotao>
              <PacientesBotao className=" w-full text-left">
                {paciente.nome}
              </PacientesBotao>
              <PacientesBotao className=" font-bold w-1/4 text-left">
                {paciente.telefone}
              </PacientesBotao>
              <PacientesBotao className=" font-bold w-1/12">
                {'>'}
              </PacientesBotao>
            </Li>
          ))}
        </ul>
      </Conteudo>
    </Background>
  );
}

export default PacientesCadastrados;
