"use client";

import { useEffect, useState } from "react";
import { supabase } from '../libs/supabase/client';
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page: number) => {
    const { data, count, error } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .ilike("name", `%${query}%`)
      .range((page - 1) * 5, page * 5 - 1);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setProducts(data);
      setTotalPages(Math.ceil(count / 5)); // Establece el total de páginas
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [query, currentPage]); // Cambiar datos cuando cambia la búsqueda o la página

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      router.push(`/searchBar?page=${nextPage}`); // Redirige a la nueva página
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      router.push(`/searchBar?page=${prevPage}`); // Redirige a la página anterior
    }
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Buscar Productos
      </h1>
      <div className="flex items-center justify-center space-x-4">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Escribe el nombre del producto"
          className="input input-bordered w-full max-w-md"
        />
      </div>
      
      <div className="mt-8">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron productos</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="py-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-indigo-600">Precio: ${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
