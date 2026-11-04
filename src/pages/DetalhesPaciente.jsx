import { useNavigate, useSearchParams } from "react-router-dom";
import Background from "../components/Background";
import Conteudo from "../components/Conteudo";
import axios from "axios";
import { useState } from "react";
import Botao from "../components/Botao"

function DetalhesPaciente(){
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const [paciente, setPaciente] = useState()
    
    axios.get(`http://localhost:3000/paciente/${id}`).then((data) => {
        setPaciente(JSON.stringify(data.data))
    })
    
    return (
        <Background>
            <Conteudo>
                <Botao onClick={() => navigate(-1)}>Voltar</Botao>
            </Conteudo>
        </Background>
    )
}

export default DetalhesPaciente;