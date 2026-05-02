// Fernando — almacén temporal para pasar el ID del gasto a editar entre pantallas
// Se lee una sola vez (consume-and-clear) para evitar que persista entre navegaciones

let pendingEditId: string | null = null;

export const setEditId = (id: string) => {
  pendingEditId = id;
};

export const consumeEditId = (): string | null => {
  const id = pendingEditId;
  pendingEditId = null;
  return id;
};
