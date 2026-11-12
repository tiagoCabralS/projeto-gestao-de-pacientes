function normalizarLista(valor) {
  if (Array.isArray(valor)) {
    return valor.filter((item) => typeof item === "string");
  }

  if (typeof valor !== "string" || valor.trim() === "") {
    return [];
  }

  try {
    const valorConvertido = JSON.parse(valor);

    if (Array.isArray(valorConvertido)) {
      return valorConvertido.filter((item) => typeof item === "string");
    }

    if (typeof valorConvertido === "string" && valorConvertido !== "") {
      return [valorConvertido];
    }
  } catch {
    return [valor];
  }

  return [];
}

export default normalizarLista;
