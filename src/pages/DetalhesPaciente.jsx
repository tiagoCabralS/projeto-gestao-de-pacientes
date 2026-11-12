import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import TdLabel from "../components/TdLabel";
import TdInfo from "../components/TdInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import Botao from "../components/Botao";
import Title from "../components/Title";
import { validarUsuario } from "../context/Validacao";
import ConfirmModal from "../components/ConfirmModal";
import normalizarLista from "../utils/normalizarLista";

function DetalhesPaciente() {
  validarUsuario();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [paciente, setPaciente] = useState();
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const alergias = normalizarLista(paciente.alergias);
  const comorbidades = normalizarLista(paciente.comorbidades);

  function handleDeletarPaciente(id) {
    axios.post(`http://localhost:3000/paciente/${id}/delete`);
    console.log(`Paciente ${id} apagado com sucesso!`);
    navigate(-1);
  }

  function handleEditClick(id){
    const query = new URLSearchParams()
    query.set("id", id)
    navigate(`/pacientes/edit?${query.toString()}`)
  }

  return (
    <Background>
      <Conteudo>
        <Title>Informações do Paciente {paciente.id}</Title>
        <table className="w-full">
          <tbody>
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
            <tr>
              <TdLabel>Sexo</TdLabel>
              <TdInfo>{paciente.sexo}</TdInfo>
              <TdLabel>Tipo Sanguíneo</TdLabel>
              <TdInfo>{paciente.tipoSanguineo}</TdInfo>
              <TdLabel>Peso</TdLabel>
              <TdInfo>{paciente.peso}Kg</TdInfo>
            </tr>
            <tr>
              <TdLabel>Altura</TdLabel>
              <TdInfo>{paciente.altura}cm</TdInfo>
              <td colSpan={4}></td>
            </tr>
            <tr>
              <TdLabel>Alergias</TdLabel>
              <td colSpan={2}>
                {alergias.length > 0 ? (
                  <ul className="list-none space-y-1">
                    {alergias.map((alergia) => (
                      <li key={alergia}>{alergia}</li>
                    ))}
                  </ul>
                ) : (
                  "Nenhuma informada"
                )}
              </td>
              <TdLabel>Comorbidades</TdLabel>
              <td colSpan={2}>
                {comorbidades.length > 0 ? (
                  <ul className="list-none space-y-1">
                    {comorbidades.map((comorbidade) => (
                      <li key={comorbidade}>{comorbidade}</li>
                    ))}
                  </ul>
                ) : (
                  "Nenhuma informada"
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between space-x-2">
          <Botao onClick={() => navigate("/pacientes/")}>Voltar</Botao>
          <Botao className="bg-blue-900" onClick={() => handleEditClick(paciente.id)}>
            Editar Informações
          </Botao>
          <Botao
            className="bg-red-900"
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            Apagar Paciente
          </Botao>
        </div>
      </Conteudo>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message={`Deseja apagar paciente ${paciente.nome} com id ${paciente.id}?`}
        title={"Confirmar apagamento de paciente"}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={() => handleDeletarPaciente(id)}
      />
    </Background>
  );
}

export default DetalhesPaciente;
