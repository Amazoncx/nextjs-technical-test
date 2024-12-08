"use server";

import { searchRPP } from "@/app/dashboard/config";
import { supabase } from "@/libs/supabase/client";
import { ProductFilter, ProductSort } from "@/types";
import { QueryData } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const fetchData = unstable_cache(
    async ({
        page = 1,
        sort = {},
        filter = {}
    }: {
        page?: number
        sort?: ProductSort
        filter?: ProductFilter
    }) => {
        const from = (page - 1 ) * searchRPP;
        const to = from + (searchRPP-1)
    
        const productsQuery = supabase
            .from("products")
            .select(`*`, { count: "exact" })
        .range(from, to);
    
        if(sort?.column) {
            productsQuery.order(sort.column, {ascending: sort.asc})
        }
    
        if(filter?.searchString) {
            const searchString = encodeURIComponent(filter.searchString.trim());
            productsQuery.or(`name.ilike.%${searchString}%,description.ilike.%${searchString}%`);
        }
    
        if(filter?.minPrice) {
            productsQuery.gte('price', filter.minPrice)
        }
    
        if(filter?.maxPrice) {
            productsQuery.lte('price', filter.maxPrice)
        }
    
        type Product = QueryData<typeof productsQuery>;
    
        const { data, error, count } = await productsQuery;
        if (error) throw error;
        const products: Product = data;
    
        return {products, count};
    },
    ['search_results'],
    { revalidate: 3600, tags: ['search_results'] }
  )
