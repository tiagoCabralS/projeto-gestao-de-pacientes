function Title(props) {
  return (
    <h1
      {...props}
      className="text-4xl uppercase text-center shadow rounded-md bg-olive-500 p-2"
    >
      {props.children}
    </h1>
  );
}

export default Title;
