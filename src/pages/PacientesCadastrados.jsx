import axios from "axios";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";

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
          <li className="flex justify-between space-x-3">
            <strong className="bg-olive-500 w-1/12 px-6 rounded-md">ID</strong>
            <strong className="w-full bg-olive-500 px-6 rounded-md">Nome</strong>
            <strong className="w-1/4 bg-olive-500 px-6 rounded-md">Telefone</strong>
            <strong className="w-1/12 bg-olive-500 px-6 rounded-md"></strong>
          </li>
          {pacientesCadastrados.map((paciente) => (
            <li key={paciente.id} className="flex justify-between space-x-3">
              <button className="bg-olive-500 w-1/12 px-6 rounded-md">
                {paciente.id}
              </button>
              <button className="w-full bg-olive-500 px-6 rounded-md">
                {paciente.nome}
              </button>
              <button className="w-1/4 bg-olive-500 px-6 rounded-md">
                {paciente.telefone}
              </button>
              <button className="w-1/12 bg-olive-500 px-6 rounded-md">
                {'>'}
              </button>
            </li>
          ))}
        </ul>
      </Conteudo>
    </Background>
  );
}

export default PacientesCadastrados;
