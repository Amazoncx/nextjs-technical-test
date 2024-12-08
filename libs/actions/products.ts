import { supabase } from "@/libs/supabase/client"; 
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

type Product = {
    id: number,
    name: string,
    description: string,
    price: number
}

type PaginationResponse = {
    products: Product[],
    count: number
    error: PostgrestError
}

export const getProducts = async (searchTerm: string | string[], currentPage = 1, pageSize = 5): Promise<PaginationResponse> => {
    try {
        // Retrieve only 5 products per query instead of getting all of the available products in the table at once.
        // Use "count" to get the total amount of products,
        // so that the "next" button in the last page can be programatically disabled.
        const { data, count, error } = await supabase
        .from("products")
        .select('*', { count: 'exact' })
        .or(`name.ilike.%${searchTerm}%`)
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

        // Revalidate the current path
        revalidatePath('/dashboard')

        const response: PaginationResponse = {products: data, count, error}
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}