import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  async function validarUsuario() {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) navigate("/login");

      const response = await axios.get(
          "http://localhost:3000/usuario/validacao",
          () => {
            headers: {
              Authorization: `Bearer ${token}`;
            }
          },
        );

        if (response.status === 403) {
          alert("Acesso não autorizado.");
          navigate("/login");
        } else {
          alert("Acesso autorizado.");
          console.log("Acesso autorizado!");
        }
      navigate("/login")
      
    };

  useEffect(() => {validarUsuario()}, []);
  return <h1>Página Inicial</h1>;
}

export default App;
