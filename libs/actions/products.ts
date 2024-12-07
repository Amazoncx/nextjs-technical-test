import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const ITEMS_POR_PAGE = 5;
/**
 * Custom hook to fetch products from the Supabase database.
 * It supports search and pagination, fetching only the products needed for the current page.
 */
/**
 * @param {string} searchQuery - 
 * @param {number} currentPage - 
 * @returns {Object} - 
 */

const useProducts = (searchQuery: string, currentPage: number) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch products based on search query and pagination state
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Query Supabase database
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .ilike('name', `%${searchQuery}%`)
        .range((currentPage - 1) * ITEMS_POR_PAGE, currentPage * ITEMS_POR_PAGE - 1);

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
        setTotalPages(Math.ceil(count / ITEMS_POR_PAGE));
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery, currentPage]);

  return { products, totalPages, loading };
};

export default useProducts;
