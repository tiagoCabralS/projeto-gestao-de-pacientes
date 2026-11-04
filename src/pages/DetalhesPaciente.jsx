import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import TdLabel from "../components/TdLabel";
import TdInfo from "../components/TdInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import Botao from "../components/Botao";
import Title from "../components/Title";

function DetalhesPaciente() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [paciente, setPaciente] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/paciente/${id}`)
      .then((data) => {
        setPaciente(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <h1>Carregando página...</h1>
      </div>
    );
  }

  return (
    <Background>
      <Conteudo>
        <Title>Informações do Paciente {paciente.id}</Title>
        <table className="w-full">
          <tr>
            <TdLabel>CPF</TdLabel>
            <TdInfo>{paciente.cpf}</TdInfo>
            <TdLabel>Nome</TdLabel>
            <TdInfo>{paciente.nome}</TdInfo>
            <TdLabel>Data Nascimento</TdLabel>
            <TdInfo>{paciente.data_nascimento}</TdInfo>
          </tr>
          <tr>
            <TdLabel>Gênero</TdLabel>
            <TdInfo>{paciente.genero}</TdInfo>
            <TdLabel>E-mail</TdLabel>
            <TdInfo>{paciente.email}</TdInfo>
            <TdLabel>Telefone</TdLabel>
            <TdInfo>{paciente.telefone}</TdInfo>
          </tr>
          <tr>
            <TdLabel>CEP</TdLabel>
            <TdInfo>{paciente.endereco.cep}</TdInfo>
            <TdLabel>Rua</TdLabel>
            <TdInfo>{paciente.endereco.rua}</TdInfo>
            <TdLabel>N°</TdLabel>
            <TdInfo>{paciente.endereco.numero}</TdInfo>
          </tr>
          <tr>
            <TdLabel>Cidade</TdLabel>
            <TdInfo>{paciente.endereco.cidade}</TdInfo>
            <TdLabel>Estado</TdLabel>
            <TdInfo>{paciente.endereco.estado}</TdInfo>
            <TdLabel>Bairro</TdLabel>
            <TdInfo>{paciente.endereco.bairro}</TdInfo>
          </tr>
        </table>
        <div className="flex justify-between space-x-2">
          <Botao onClick={() => navigate(-1)}>Página Inicial</Botao>
          <Botao className="bg-blue-800" onClick={() => navigate(-1)}>
            Editar Informações
          </Botao>
          <Botao className="bg-red-800" onClick={() => navigate(-1)}>
            Apagar Paciente
          </Botao>
        </div>
      </Conteudo>
    </Background>
  );
}

export default DetalhesPaciente;

// {"id":1,"nome":"Tiago","data_nascimento":"2007-08-13","genero":"M","cpf":"67676767676","telefone":"13676767676","email":"yuri@email.com","endereco":{"cep":"11111111","rua":"Rua Das Águas","numero":"69","bairro":"Joinvile","cidade":"Pindamonhangaba","estado":"Acre"},"tipoSanguineo":"O+","alergias":[],"comorbidades":[],"peso":80.5,"altura":2.67}
