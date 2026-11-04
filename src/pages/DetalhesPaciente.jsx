import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import axios from "axios";
import { useEffect, useState } from "react";
import Botao from "../components/Botao";

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
        <h1 className="text-4xl uppercase text-center shadow rounded-md bg-olive-500 p-2">
          Informações do Paciente {paciente.id}
        </h1>
        <table className="w-full">
          <tr>
            <td className="font-bold">CPF</td>
            <td>{paciente.cpf}</td>
            <td className="font-bold">Nome</td>
            <td>{paciente.nome}</td>
            <td className="font-bold">Data Nascimento</td>
            <td>{paciente.data_nascimento}</td>
          </tr>
          <tr>
            <td className="font-bold">Gênero</td>
            <td>{paciente.genero}</td>
            <td className="font-bold">E-mail</td>
            <td>{paciente.email}</td>
            <td className="font-bold">Telefone</td>
            <td>{paciente.telefone}</td>
          </tr>
          <tr>
            <td className="font-bold">CEP</td>
            <td>{paciente.endereco.cep}</td>
            <td className="font-bold">Rua</td>
            <td>{paciente.endereco.rua}</td>
            <td className="font-bold">N°</td>
            <td>{paciente.endereco.numero}</td>
          </tr>
          <tr>
            <td className="font-bold">Cidade</td>
            <td>{paciente.endereco.cidade}</td>
            <td className="font-bold">Estado</td>
            <td>{paciente.endereco.estado}</td>
            <td className="font-bold">Bairro</td>
            <td>{paciente.endereco.bairro}</td>
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
