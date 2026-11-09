import Background from "../components/Background"
import Conteudo from "../components/Conteudo"
import { useState, useEffect } from "react";
import { validarUsuario } from "../context/Validacao";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import Formulario from "../components/Formulario";
import Title from "../components/Title";
import Label from "../components/Label";
import Botao from "../components/Botao";

function CadastrarPaciente(props){
    validarUsuario()
    

    function handleCadastro(){
        
    }

    const navigate = useNavigate()
    
    return <Background className="h-fit">
        <Conteudo>
            <Title>Novo Paciente</Title>
            <Formulario className="space-y-4">
                <div className="flex flex-col">
                    <h3 className="text-2xl text-center font-bold uppercase">Dados Pessoais e de Contato</h3>
                    <Label htmlFor="nome">Nome:</Label>
                    <Input type="text" id="nome" name="nome"/>
                    <Label htmlFor="data_nascimento">Data de Nascimento:</Label>
                    <Input type="date" id="data_nascimento" name="data_nascimento"/>
                    <Label htmlFor="genero">Gênero:</Label>
                    <Input type="text" id="genero" name="genero"/>
                    <Label htmlFor="telefone">Telefone:</Label>
                    <Input type="number" id="telefone" name="telefone"/>
                    <Label htmlFor="email">E-mail:</Label>
                    <Input type="email" id="email" name="email"/>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-2xl text-center font-bold uppercase">Endereço</h3>
                    <Label htmlFor="cep">CEP:</Label>
                    <Input type="number" id="cep" name="cep"/>
                    <Label htmlFor="rua">Rua:</Label>
                    <Input type="text" id="rua" name="rua"/>
                    <Label htmlFor="numero">Número:</Label>
                    <Input type="number" id="numero" name="numero"/>
                    <Label htmlFor="bairro">Bairro:</Label>
                    <Input type="text" id="bairro" name="bairro"/>
                    <Label htmlFor="cidade">Cidade:</Label>
                    <Input type="text" id="cidade" name="cidade"/>
                    <Label htmlFor="estado">Estado:</Label>
                    <Input type="text" id="estado" name="estado"/>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-2xl text-center font-bold uppercase">Informações Clínicas</h3>
                    <Label htmlFor="sexo">Sexo:</Label>
                    <Input type="text" id="sexo" name="sexo"/>
                    <Label htmlFor="tipoSanguineo">Tipo Sanguíneo:</Label>
                    <Input type="text" id="tipoSanguineo" name="tipoSanguineo"/>
                    <Label htmlFor="alergias">Alergias:</Label>
                    <Input type="text" id="alergias" name="alergias"/>
                    <Label htmlFor="comorbidades">Comorbidades:</Label>
                    <Input type="text" id="comorbidades" name="comorbidades"/>
                    <Label htmlFor="peso">Peso:</Label>
                    <Input type="number" id="peso" name="peso"/>
                    <Label htmlFor="altura">Altura:</Label>
                    <Input type="number" id="altura" name="altura"/>
                </div>
                <div className="">
                    <Botao className="w-full">Cadastrar</Botao>
                </div>
            </Formulario>        
        </Conteudo>
    </Background>
}

export default CadastrarPaciente

// {"id":1,"nome":"Tiago","data_nascimento":"2007-08-13","genero":"M","cpf":"67676767676","telefone":"13676767676","email":"yuri@email.com","endereco":{"cep":"11111111","rua":"Rua Das Águas","numero":"69","bairro":"Joinvile","cidade":"Pindamonhangaba","estado":"Acre"},"tipoSanguineo":"O+","alergias":[],"comorbidades":[],"peso":80.5,"altura":2.67}