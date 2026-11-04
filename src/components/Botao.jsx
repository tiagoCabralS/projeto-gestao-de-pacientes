import { twMerge } from "tailwind-merge";

function Botao(props) {
  const estilosIniciais = "bg-olive-700 text-white p-2 rounded-md uppercase"
  const estilosFinais = twMerge(estilosIniciais, props.className)

  return (
    <button {...props} className={estilosFinais}>
      {props.children}
    </button>
  );
}

export default Botao;
