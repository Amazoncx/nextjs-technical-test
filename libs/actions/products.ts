import { supabase } from "../supabase/client";
/**
 * Obtiene los productos de la base de datos de Supabase con paginación y búsqueda.
 * @param {number} page - Número de la página actual.
 * @param {string} search - Término de búsqueda.
 * @returns {Promise<{ data: Product[], totalPages: number }>} - Un objeto que contiene los productos y el número total de páginas.
 */
export const getProducts = async (page: number = 1, search: string = "") => {
  try {
    if (isNaN(page) || page < 1) page = 1;

    const limit = 5;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("products")
      .select("id, name, description, price", { count: "exact" })
      .ilike("name", `%${search}%`)
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`Error fetching products: ${error.message}`);

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      data,
      totalPages,
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
