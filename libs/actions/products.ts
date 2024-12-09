"use server";

import { GetProductsResult } from "@/types/product";
import { supabase } from "../supabase/client";

export const getProducts = async (page: number = 1, search: string = ""): Promise<GetProductsResult>  => {
  try {
    if (isNaN(page) || page < 1) page = 1;

    const limit = 5;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("products")
      .select("id, name, description, price", { count: "exact" })
      .range(offset, offset + limit - 1);
      
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(`Error fetching products: ${error.message}`);

    const totalPages = Math.ceil((count || 0) / limit);

    return { data, totalPages};
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};