import { useState } from "react";
import Botao from "../Botao";
import Formulario from "../Formulario";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";
import {
  opcoesAlergias,
  opcoesComorbidades,
  ufs,
} from "../../data/opcoesPaciente";
import normalizarLista from "../../utils/normalizarLista";

const valoresIniciais = {
  nome: "",
  cpf: "",
  data_nascimento: "",
  genero: "Homem",
  telefone: "",
  email: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "AC",
  sexo: "M",
  tipoSanguineo: "A+",
  alergias: [],
  comorbidades: [],
  peso: "",
  altura: "",
};

function criarValoresFormulario(initialValues = {}) {
  return {
    nome: initialValues.nome ?? "",
    cpf: initialValues.cpf ?? "",
    data_nascimento: initialValues.data_nascimento
      ? String(initialValues.data_nascimento).slice(0, 10)
      : "",
    genero: initialValues.genero ?? valoresIniciais.genero,
    telefone: initialValues.telefone ?? "",
    email: initialValues.email ?? "",
    cep: initialValues.cep ?? "",
    rua: initialValues.rua ?? "",
    numero: initialValues.numero ?? "",
    bairro: initialValues.bairro ?? "",
    cidade: initialValues.cidade ?? "",
    estado: initialValues.estado ?? valoresIniciais.estado,
    sexo: initialValues.sexo ?? valoresIniciais.sexo,
    tipoSanguineo:
      initialValues.tipoSanguineo ?? valoresIniciais.tipoSanguineo,
    peso: initialValues.peso ?? "",
    altura: initialValues.altura ?? "",
    alergias: normalizarLista(initialValues.alergias),
    comorbidades: normalizarLista(initialValues.comorbidades),
  };
}

function PacienteForm({
  initialValues = valoresIniciais,
  onSubmit,
  submitLabel = "Cadastrar",
  method = "POST",
  isSubmitting = false,
  error = "",
  showResetButton = false,
}) {
  const [values, setValues] = useState(() =>
    criarValoresFormulario(initialValues),
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  }

  function alternarOpcao(campo, valor) {
    setValues((currentValues) => {
      const selecionados = currentValues[campo];
      const novosSelecionados = selecionados.includes(valor)
        ? selecionados.filter((item) => item !== valor)
        : [...selecionados, valor];

      return { ...currentValues, [campo]: novosSelecionados };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  function handleReset(e) {
    e.preventDefault();
    setValues(criarValoresFormulario(initialValues));
  }

  return (
    <Formulario
      id="paciente-form"
      onSubmit={handleSubmit}
      onReset={handleReset}
      method={method}
      className="space-y-4"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl text-center font-bold uppercase">
          Dados Pessoais e de Contato
        </h3>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          onChange={handleChange}
          value={values.nome}
          type="text"
          id="nome"
          name="nome"
          required
        />
        <Label htmlFor="cpf">CPF:</Label>
        <Input
          onChange={handleChange}
          value={values.cpf}
          type="text"
          id="cpf"
          name="cpf"
          required
        />
        <Label htmlFor="data_nascimento">Data de Nascimento:</Label>
        <Input
          onChange={handleChange}
          value={values.data_nascimento}
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          required
        />
        <Label htmlFor="genero">Gênero:</Label>
        <Select
          onChange={handleChange}
          value={values.genero}
          id="genero"
          name="genero"
          required
        >
          <option value="Homem">Homem</option>
          <option value="mulher">Mulher</option>
          <option value="nao_binario">Não Binário</option>
          <option value="prefire_nao_responder">Prefiro não responder</option>
        </Select>
        <Label htmlFor="telefone">Telefone:</Label>
        <Input
          onChange={handleChange}
          value={values.telefone}
          type="tel"
          id="telefone"
          name="telefone"
          required
        />
        <Label htmlFor="email">E-mail:</Label>
        <Input
          onChange={handleChange}
          value={values.email}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl text-center font-bold uppercase">Endereço</h3>
        <Label htmlFor="cep">CEP:</Label>
        <Input
          onChange={handleChange}
          value={values.cep}
          type="text"
          id="cep"
          name="cep"
          inputMode="numeric"
          required
        />
        <Label htmlFor="rua">Rua:</Label>
        <Input
          onChange={handleChange}
          value={values.rua}
          type="text"
          id="rua"
          name="rua"
          required
        />
        <Label htmlFor="numero">Número:</Label>
        <Input
          onChange={handleChange}
          value={values.numero}
          type="text"
          id="numero"
          name="numero"
          required
        />
        <Label htmlFor="bairro">Bairro:</Label>
        <Input
          onChange={handleChange}
          value={values.bairro}
          type="text"
          id="bairro"
          name="bairro"
          required
        />
        <Label htmlFor="cidade">Cidade:</Label>
        <Input
          onChange={handleChange}
          value={values.cidade}
          type="text"
          id="cidade"
          name="cidade"
          required
        />
        <Label htmlFor="estado">Estado:</Label>
        <Select
          name="estado"
          id="estado"
          onChange={handleChange}
          value={values.estado}
          required
        >
          {ufs.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl text-center font-bold uppercase">
          Informações Clínicas
        </h3>
        <Label htmlFor="sexo">Sexo:</Label>
        <Select
          onChange={handleChange}
          value={values.sexo}
          name="sexo"
          id="sexo"
          required
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </Select>
        <Label htmlFor="tipoSanguineo">Tipo Sanguíneo:</Label>
        <Select
          onChange={handleChange}
          value={values.tipoSanguineo}
          id="tipoSanguineo"
          name="tipoSanguineo"
          required
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </Select>
        <Label htmlFor="alergias">Alergias:</Label>
        <div className="grid grid-cols-2 gap-2">
          {opcoesAlergias.map((alergia) => (
            <Label
              key={alergia.id}
              className="bg-white p-2 rounded-md"
            >
              <input
                type="checkbox"
                value={alergia.labelCurta}
                checked={values.alergias.includes(alergia.labelCurta)}
                onChange={() =>
                  alternarOpcao("alergias", alergia.labelCurta)
                }
              />
              {alergia.labelCurta} | {alergia.sinonimo}
            </Label>
          ))}
        </div>
        <Label htmlFor="comorbidades">Comorbidades:</Label>
        <div className="grid grid-cols-2 gap-2">
          {opcoesComorbidades.map((comorbidade) => (
            <Label
              key={comorbidade.id}
              className="bg-white p-2 rounded-md"
            >
              <input
                type="checkbox"
                value={comorbidade.labelCurta}
                checked={values.comorbidades.includes(
                  comorbidade.labelCurta,
                )}
                onChange={() =>
                  alternarOpcao("comorbidades", comorbidade.labelCurta)
                }
              />
              {comorbidade.labelCurta} | {comorbidade.sinonimo}
            </Label>
          ))}
        </div>
        <Label htmlFor="peso">Peso (Kg):</Label>
        <Input
          onChange={handleChange}
          value={values.peso}
          type="number"
          id="peso"
          name="peso"
          step="0.1"
          required
        />
        <Label htmlFor="altura">Altura (cm):</Label>
        <Input
          onChange={handleChange}
          value={values.altura}
          type="number"
          id="altura"
          name="altura"
          step="1"
          required
        />
      </div>

      {error && <p role="alert" className="text-red-700">{error}</p>}

      <div className="flex gap-2">
        {showResetButton && (
          <Botao type="reset" className="w-full">
            Limpar Formulário
          </Botao>
        )}
        <Botao type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : submitLabel}
        </Botao>
      </div>
    </Formulario>
  );
}

export default PacienteForm;
