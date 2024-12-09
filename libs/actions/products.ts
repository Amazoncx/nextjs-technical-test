import { supabase } from "../supabase/client";

// Función para insertar un nuevo producto
export const createProduct = async (nombre: string, descripcion: string, precio: number) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([{ name: nombre, description: descripcion, price: precio }]);

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("Error al crear producto:", error.message);
    throw new Error("No se pudo crear el producto.");
  }
};

// Función para obtener productos con búsqueda y paginación
export const fetchProducts = async (search: string = "", page: number = 1, pageSize: number = 5) => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${search}%`)
      .range(from, to);

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("Error al obtener productos:", error.message);
    throw new Error("No se pudo obtener la lista de productos.");
  }
};
