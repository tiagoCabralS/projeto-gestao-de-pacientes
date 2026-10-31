function Botao(props) {
  return (
    <button {...props} className="bg-olive-700 p-1 rounded-md uppercase">
      {props.children}
    </button>
  );
}

export default Botao;
