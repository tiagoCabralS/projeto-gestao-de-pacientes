import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import Botao from "../components/Botao";
import Conteudo from "../components/Conteudo";
import PacienteForm from "../components/forms/PacienteForm";
import Title from "../components/Title";
import { validarUsuario } from "../context/Validacao";

function CadastrarPaciente() {
  validarUsuario();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleCadastro(values) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/paciente/create",
        values,
      );
      navigate(`/pacientes/detalhes/?id=${response.data.id}/`);
    } catch {
      setError("Não foi possível cadastrar o paciente. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Background className="h-fit">
      <div className="fixed bg-olive-300 p-4 rounded-md left-0 top-0 m-2 flex flex-col gap-2">
        <Botao type="button" onClick={() => navigate("/pacientes")}>
          Página Inicial
        </Botao>
      </div>
      <Conteudo>
        <Title>Novo Paciente</Title>
        <PacienteForm
          onSubmit={handleCadastro}
          isSubmitting={isSubmitting}
          error={error}
          showResetButton
        />
      </Conteudo>
    </Background>
  );
}

export default CadastrarPaciente;
