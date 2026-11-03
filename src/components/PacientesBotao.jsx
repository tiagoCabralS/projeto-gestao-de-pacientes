import { twMerge } from "tailwind-merge"

function PacientesBotao(props){
    const estiloPadrao = "bg-olive-500 px-6 rounded-md"

    const classesFinais = twMerge(estiloPadrao, props.className)

    return <button {...props} className={classesFinais}>
        {props.children}
    </button>
}

export default PacientesBotao