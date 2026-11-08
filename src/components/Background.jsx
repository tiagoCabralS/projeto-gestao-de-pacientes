import { twMerge } from "tailwind-merge"

function Background(props){
    const estiloPadrao = "h-screen p-2 bg-olive-900 flex justify-center items-center"
    const estiloFinal = twMerge(estiloPadrao, props.className)

    return <div className={estiloFinal}>
        {props.children}
    </div>
}

export default Background