function Select(props) {
  return (
    <select
      className="bg-white p-2 rounded-md"
      {...props}
    >
      {props.children}
    </select>
  );
}

export default Select;
