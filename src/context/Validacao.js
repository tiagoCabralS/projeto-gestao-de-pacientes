import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function validarUsuario() {
  const navigate = useNavigate();

  useEffect(() => {
    async function validacao() {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/usuario/validacao",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 403) {
          alert("Acesso não autorizado.");
          navigate("/login");
        }

        console.log("Acesso autorizado!");
      } catch {
        alert("Acesso não autorizado.");
        navigate("/login");
      }
    }

    validacao();
  }, []);
}
