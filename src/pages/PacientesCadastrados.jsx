import axios from "axios";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import Li from "../components/Li";
import PacientesBotao from "../components/PacientesBotao";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

function PacientesCadastrados() {
  const navigate = useNavigate()
  const [pacientesCadastrados, setPacientesCadastrados] = useState([]);

  function verDetalhes(id){
    const query = new URLSearchParams()
    query.set("id", id)
    navigate(`/pacientes/detalhes?${query.toString()}`)
  }

  useEffect(() => {
    axios.get("http://localhost:3000/paciente/all").then(({ data }) => {
      setPacientesCadastrados(data);
    });
  }, []);

  return (
    <Background>
      <Conteudo>
        <Title>Pacientes</Title>
        <ul className="grid grid-cols-1 space-y-2">
          <Li>
            <PacientesBotao className=" w-1/12 font-bold">ID</PacientesBotao>
            <PacientesBotao className=" w-full text-left font-bold">Nome</PacientesBotao>
            <PacientesBotao className=" w-1/4 font-bold">Telefone</PacientesBotao>
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
              <PacientesBotao 
              onClick={() => {verDetalhes(paciente.id)}} 
              className=" font-bold w-1/12">
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
