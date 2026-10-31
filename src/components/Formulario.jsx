function Formulario(props){
    return <form className="flex flex-col gap-2" {...props}>
        {props.children}
    </form>
}

export default Formulario