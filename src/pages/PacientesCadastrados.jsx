import axios from "axios";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import Li from "../components/Li";

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
            <strong className="bg-olive-500 px-6 rounded-md w-1/12">ID</strong>
            <strong className="bg-olive-500 px-6 rounded-md w-full">Nome</strong>
            <strong className="bg-olive-500 px-6 rounded-md w-1/4">Telefone</strong>
            <strong className="bg-olive-500 px-6 rounded-md w-1/12"></strong>
          </Li>
          {pacientesCadastrados.map((paciente) => (
            <Li key={paciente.id}>
              <button className="bg-olive-500 px-6 rounded-md w-1/12">
                {paciente.id}
              </button>
              <button className="bg-olive-500 px-6 rounded-md w-full text-left">
                {paciente.nome}
              </button>
              <button className="bg-olive-500 px-6 rounded-md font-bold w-1/4 text-left">
                {paciente.telefone}
              </button>
              <button className="bg-olive-500 px-6 rounded-md font-bold w-1/12">
                {'>'}
              </button>
            </Li>
          ))}
        </ul>
      </Conteudo>
    </Background>
  );
}

export default PacientesCadastrados;
