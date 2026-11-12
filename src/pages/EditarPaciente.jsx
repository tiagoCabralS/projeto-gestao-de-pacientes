import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "../components/Background";
import Botao from "../components/Botao";
import Conteudo from "../components/Conteudo";
import PacienteForm from "../components/forms/PacienteForm";
import Title from "../components/Title";

function EditarPaciente() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function carregarPaciente() {
      try {
        const response = await axios.get(
          `http://localhost:3000/paciente/${id}`,
        );
        if (active) {
          const dadosPaciente = response.data;
          setPaciente({
            ...dadosPaciente,
            cep: dadosPaciente.cep ?? dadosPaciente.endereco?.cep ?? "",
            rua: dadosPaciente.rua ?? dadosPaciente.endereco?.rua ?? "",
            numero:
              dadosPaciente.numero ?? dadosPaciente.endereco?.numero ?? "",
            bairro: dadosPaciente.bairro ?? dadosPaciente.endereco?.bairro ?? "",
            cidade: dadosPaciente.cidade ?? dadosPaciente.endereco?.cidade ?? "",
            estado: dadosPaciente.estado ?? dadosPaciente.endereco?.estado ?? "AC",
          });
        }
      } catch {
        if (active) {
          setError("Não foi possível carregar os dados do paciente.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    carregarPaciente();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleEdicao(values) {
    setIsSubmitting(true);
    setError("");

    try {
      await axios.post(`http://localhost:3000/paciente/${id}/edit`, values);
      navigate(`/pacientes/detalhes/?id=${id}/`);
    } catch {
      setError("Não foi possível atualizar o paciente. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Background>
        <Conteudo>
          <p>Carregando paciente...</p>
        </Conteudo>
      </Background>
    );
  }

  if (!paciente) {
    return (
      <Background>
        <Conteudo>
          <Title>Editar Paciente</Title>
          <p role="alert" className="text-red-700">
            {error}
          </p>
          <Botao type="button" onClick={() => navigate("/pacientes")}>
            Voltar para pacientes
          </Botao>
        </Conteudo>
      </Background>
    );
  }

  return (
    <Background className="h-fit">
      <Conteudo>
        <Title>Editar Paciente</Title>
        <PacienteForm
          initialValues={paciente}
          onSubmit={handleEdicao}
          submitLabel="Salvar alterações"
          method="POST"
          isSubmitting={isSubmitting}
          error={error}
        />
      </Conteudo>
    </Background>
  );
}

export default EditarPaciente;
