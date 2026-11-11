import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import { useState, useEffect } from "react";
import { validarUsuario } from "../context/Validacao";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import Formulario from "../components/Formulario";
import Title from "../components/Title";
import Label from "../components/Label";
import Botao from "../components/Botao";
import axios from "axios";
import Select from "../components/Select";

function CadastrarPaciente(props) {
  validarUsuario();

  const [nome, setNome] = useState();
  const [cpf, setCPF] = useState();
  const [data_nascimento, setData_nascimento] = useState();
  const [genero, setGenero] = useState("Homem");
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [cep, setCEP] = useState();
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState("AC");
  const [sexo, setSexo] = useState("M");
  const [tipoSanguineo, setTipoSanguineo] = useState("A+");
  const [alergias, setAlergias] = useState([]);
  const [comorbidades, setComorbidades] = useState([]);
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();

  const listaComorbidades = [
    {
      id: 1,
      cid10: "I10",
      nomeTecnico: "Hipertensão Arterial Sistêmica",
      labelCurta: "Hipertensão",
      categoria: "Cardiovascular",
      sinonimos: ["pressão alta", "has", "hipertenso"],
    },
    {
      id: 2,
      cid10: "E11",
      nomeTecnico: "Diabetes Mellitus Tipo 2",
      labelCurta: "Diabetes Tipo 2",
      categoria: "Endócrino/Metabólico",
      sinonimos: ["dm2", "açúcar no sangue", "glicemia alta", "diabete"],
    },
    {
      id: 3,
      cid10: "E10",
      nomeTecnico: "Diabetes Mellitus Tipo 1",
      labelCurta: "Diabetes Tipo 1",
      categoria: "Endócrino/Metabólico",
      sinonimos: ["dm1", "insulino dependente", "diabete juvenil"],
    },
    {
      id: 4,
      cid10: "E78",
      nomeTecnico: "Dislipidemia",
      labelCurta: "Colesterol Alto",
      categoria: "Endócrino/Metabólico",
      sinonimos: ["colesterol", "triglicerídeos", "hipercolesterolemia"],
    },
    {
      id: 5,
      cid10: "E66",
      nomeTecnico: "Obesidade",
      labelCurta: "Obesidade",
      categoria: "Endócrino/Metabólico",
      sinonimos: ["sobrepeso", "imc alto"],
    },
    {
      id: 6,
      cid10: "E03",
      nomeTecnico: "Hipotireoidismo",
      labelCurta: "Hipotireoidismo",
      categoria: "Endócrino/Metabólico",
      sinonimos: ["tireoide", "tsh alto", "hashimoto"],
    },
    {
      id: 7,
      cid10: "J45",
      nomeTecnico: "Asma Brônquica",
      labelCurta: "Asma",
      categoria: "Respiratório",
      sinonimos: ["bronquite asmática", "chiado no peito", "falta de ar"],
    },
    {
      id: 8,
      cid10: "J44",
      nomeTecnico: "Doença Pulmonar Obstrutiva Crônica",
      labelCurta: "DPOC / Enfisema",
      categoria: "Respiratório",
      sinonimos: ["dpoc", "enfisema pulmonar", "bronquite crônica"],
    },
    {
      id: 9,
      cid10: "N18",
      nomeTecnico: "Doença Renal Crônica",
      labelCurta: "Doença Renal Crônica",
      categoria: "Renal",
      sinonimos: ["drc", "insuficiência renal", "problema nos rins"],
    },
    {
      id: 10,
      cid10: "I50",
      nomeTecnico: "Insuficiência Cardíaca",
      labelCurta: "Insuficiência Cardíaca",
      categoria: "Cardiovascular",
      sinonimos: ["ic", "coração fraco", "coração inchado", "icc"],
    },
    {
      id: 11,
      cid10: "F32",
      nomeTecnico: "Transtorno Depressivo",
      labelCurta: "Depressão",
      categoria: "Saúde Mental",
      sinonimos: ["episódio depressivo", "tristeza profunda"],
    },
    {
      id: 12,
      cid10: "F41",
      nomeTecnico: "Transtorno de Ansiedade",
      labelCurta: "Ansiedade",
      categoria: "Saúde Mental",
      sinonimos: ["tag", "crise de ansiedade", "pânico"],
    },
  ];

  const listaAlergias = [
    {
      id: 1,
      cid10: "J30",
      nomeTecnico: "Rinite Alérgica devido a Pólen ou Outros Alérgenos",
      labelCurta: "Rinite Alérgica",
      categoria: "Respiratório / Imunológico",
      sinonimos: [
        "alergia a poeira",
        "alergia a ácaro",
        "coriza",
        "espirros frequentes",
      ],
    },
    {
      id: 2,
      cid10: "L20",
      nomeTecnico: "Dermatite Atópica",
      labelCurta: "Dermatite Atópica",
      categoria: "Dermatológico / Imunológico",
      sinonimos: [
        "eczema",
        "alergia de pele",
        "pele seca com coceira",
        "atopias",
      ],
    },
    {
      id: 3,
      cid10: "H10.1",
      nomeTecnico: "Conjuntivite Alérgica Aguda",
      labelCurta: "Conjuntivite Alérgica",
      categoria: "Oftalmológico / Imunológico",
      sinonimos: ["olhos vermelhos", "coceira nos olhos", "olho irritado"],
    },
    {
      id: 4,
      cid10: "L50",
      nomeTecnico: "Urticária Alérgica",
      labelCurta: "Urticária",
      categoria: "Dermatológico / Imunológico",
      sinonimos: ["empolamento", "placas vermelhas", "coceira pelo corpo"],
    },
    {
      id: 5,
      cid10: "T78.0",
      nomeTecnico: "Alergia Alimentar Mediada por IgE",
      labelCurta: "Alergia Alimentar",
      categoria: "Gastrintestinal / Imunológico",
      sinonimos: [
        "alergia a camarão",
        "alergia a amendoim",
        "reação alimentar",
      ],
    },
    {
      id: 6,
      cid10: "K52.2",
      nomeTecnico: "Alergia à Proteína do Leite de Vaca",
      labelCurta: "APLV",
      categoria: "Gastrintestinal / Imunológico",
      sinonimos: ["aplv", "alergia ao leite", "alergia a derivados do leite"],
    },
    {
      id: 7,
      cid10: "T88.7",
      nomeTecnico: "Efeito Adverso Devido a Medicamento Não Especificado",
      labelCurta: "Alergia a Medicamento",
      categoria: "Imunológico / Geral",
      sinonimos: [
        "alergia a dipirona",
        "alergia a penicilina",
        "reação a remédio",
        "alergia a anti-inflamatório",
      ],
    },
    {
      id: 8,
      cid10: "L23",
      nomeTecnico: "Dermatite de Contato Alérgica",
      labelCurta: "Dermatite de Contato",
      categoria: "Dermatológico / Imunológico",
      sinonimos: [
        "alergia a bijuteria",
        "alergia a níquel",
        "alergia a esmalte",
        "irritação por produto",
      ],
    },
    {
      id: 9,
      cid10: "T63.4",
      nomeTecnico:
        "Efeito Tóxico de Veneno de Outros Artrópodes (Picada Alérgica)",
      labelCurta: "Alergia a Picada de Inseto",
      categoria: "Dermatológico / Imunológico",
      sinonimos: [
        "estrófulo",
        "alergia a mosquito",
        "alergia a formiga",
        "picada de abelha",
      ],
    },
    {
      id: 10,
      cid10: "T78.2",
      nomeTecnico: "Choque Anafilático Não Especificado",
      labelCurta: "Anafilaxia",
      categoria: "Emergência / Imunológico",
      sinonimos: [
        "choque anafilático",
        "glote fechada",
        "reação alérgica grave",
      ],
    },
    {
      id: 11,
      cid10: "Z88.7",
      nomeTecnico: "História de Reação Alérgica a Látex",
      labelCurta: "Alergia a Látex",
      categoria: "Imunológico / Geral",
      sinonimos: [
        "alergia a luva de borracha",
        "alergia a preservativo",
        "reacao ao latex",
      ],
    },
    {
      id: 12,
      cid10: "L56.3",
      nomeTecnico: "Urticária Solar",
      labelCurta: "Alergia ao Sol",
      categoria: "Dermatológico",
      sinonimos: [
        "alergia ao calor",
        "fotodermatite",
        "erupção polimorfa à luz",
      ],
    },
  ];

  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  function handleSelecaoCheckbox(nomeTecnico, setState) {
    setState((estadoAnterior) => {
      if (estadoAnterior.includes(nomeTecnico)) {
        // se já esta marcado filtra para remover
        return estadoAnterior.filter((valor) => valor !== nomeTecnico);
      } else {
        // se não está marcado adiciona ao final do array
        return [...estadoAnterior, nomeTecnico];
      }
    });
  }

  async function handleCadastro(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/paciente/create", {
          nome,
          cpf,
          data_nascimento,
          genero,
          telefone,
          email,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          sexo,
          tipoSanguineo,
          alergias,
          comorbidades,
          peso,
          altura,
        })
        .then((response) => {
          navigate(`/pacientes/detalhes/?id=${response.data.id}/`);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  return (
    <Background className="h-fit">
      <Conteudo>
        <Title>Novo Paciente</Title>
        <Formulario
          onSubmit={handleCadastro}
          method="POST"
          className="space-y-4"
        >
          <div className="flex flex-col">
            <h3 className="text-2xl text-center font-bold uppercase">
              Dados Pessoais e de Contato
            </h3>
            <Label htmlFor="nome">Nome:</Label>
            <Input
              onChange={(e) => setNome(e.target.value)}
              type="text"
              id="nome"
              name="nome"
              required
            />
            <Label htmlFor="cpf">CPF:</Label>
            <Input
              onChange={(e) => setCPF(e.target.value)}
              type="text"
              id="cpf"
              name="cpf"
              required
            />
            <Label htmlFor="data_nascimento">Data de Nascimento:</Label>
            <Input
              onChange={(e) => setData_nascimento(e.target.value)}
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              required
            />
            <Label htmlFor="genero">Gênero:</Label>
            <Select
              onChange={(e) => setGenero(e.target.value)}
              id="genero"
              name="genero"
              required
            >
              <option value="homem">Homem</option>
              <option value="mulher">Mulher</option>
              <option value="nao_binario">Não Binário</option>
              <option value="prefire_nao_responder">
                Prefiro não responder
              </option>
            </Select>
            <Label htmlFor="telefone">Telefone:</Label>
            <Input
              onChange={(e) => setTelefone(e.target.value)}
              type="number"
              id="telefone"
              name="telefone"
              required
            />
            <Label htmlFor="email">E-mail:</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-center font-bold uppercase">
              Endereço
            </h3>
            <Label htmlFor="cep">CEP:</Label>
            <Input
              onChange={(e) => setCEP(e.target.value)}
              type="number"
              id="cep"
              name="cep"
              required
            />
            <Label htmlFor="rua">Rua:</Label>
            <Input
              onChange={(e) => setRua(e.target.value)}
              type="text"
              id="rua"
              name="rua"
              required
            />
            <Label htmlFor="numero">Número:</Label>
            <Input
              onChange={(e) => setNumero(e.target.value)}
              type="number"
              id="numero"
              name="numero"
              required
            />
            <Label htmlFor="bairro">Bairro:</Label>
            <Input
              onChange={(e) => setBairro(e.target.value)}
              type="text"
              id="bairro"
              name="bairro"
              required
            />
            <Label htmlFor="cidade">Cidade:</Label>
            <Input
              onChange={(e) => setCidade(e.target.value)}
              type="text"
              id="cidade"
              name="cidade"
              required
            />
            <Label htmlFor="estado">Estado:</Label>
            <Select
              name="estado"
              id="estado"
              onChange={(e) => setEstado(e.target.value)}
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
              onChange={(e) => setSexo(e.target.value)}
              type="text"
              name="sexo"
              id="sexo"
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </Select>
            <Label htmlFor="tipoSanguineo">Tipo Sanguíneo:</Label>
            <Select
              onChange={(e) => setTipoSanguineo(e.target.value)}
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
              {listaAlergias.map((alergia) => (
                <Label className="bg-white p-2 rounded-md">
                  <input
                    type="checkbox"
                    value={alergia.nomeTecnico}
                    checked={alergias.includes(alergia.nomeTecnico)}
                    onChange={() =>
                      handleSelecaoCheckbox(alergia.nomeTecnico, setAlergias)
                    }
                  />
                  {alergia.nomeTecnico} | {alergia.sinonimos[0]}
                </Label>
              ))}
            </div>
            <Label htmlFor="comorbidades">Comorbidades:</Label>
            <div className="grid grid-cols-2 gap-2">
              {listaComorbidades.map((comorbidade) => (
                <Label className="bg-white p-2 rounded-md">
                  <input
                    type="checkbox"
                    value={comorbidade.nomeTecnico}
                    checked={comorbidades.includes(comorbidade.nomeTecnico)}
                    onChange={() =>
                      handleSelecaoCheckbox(
                        comorbidade.nomeTecnico,
                        setComorbidades,
                      )
                    }
                  />
                  {comorbidade.nomeTecnico} | {comorbidade.sinonimos[0]}
                </Label>
              ))}
            </div>
            <Label htmlFor="peso">Peso (Kg):</Label>
            <Input
              onChange={(e) => setPeso(e.target.value)}
              type="number"
              id="peso"
              name="peso"
              required
            />
            <Label htmlFor="altura">Altura (cm):</Label>
            <Input
              onChange={(e) => setAltura(e.target.value)}
              type="number"
              id="altura"
              name="altura"
              required
            />
          </div>
          <div className="">
            <Botao className="w-full">Cadastrar</Botao>
          </div>
        </Formulario>
      </Conteudo>
    </Background>
  );
}

export default CadastrarPaciente;
