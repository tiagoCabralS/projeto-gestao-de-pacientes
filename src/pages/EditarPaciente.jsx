import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditarPaciente(){
    const navigate = useNavigate()
    const [paciente, setPaciente] = useState()
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); 
    
    useEffect(() => {
    axios
      .get(`http://localhost:3000/paciente/${id}`)
      .then((data) => {
        setPaciente(data.data);
      })
      .finally(() => {
          setLoading(false)
      }
      )
  }, [id]);

  if (loading){
    return <div>
        <h1>Carregando página...</h1>
    </div>
  }

  return <h1>{paciente.nome}</h1>

}

export default EditarPaciente;