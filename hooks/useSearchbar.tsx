"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
/**
 * Custom hook para manejar la barra de búsqueda, sincronización con la URL y debouncing de la búsqueda.
 * Este hook gestiona el estado del campo de búsqueda, actualiza la URL con el valor de búsqueda,
 * y maneja la lógica para limpiar la búsqueda o enviar el formulario.
 *
 * @returns {object} - Retorna el estado `search` (valor actual de la búsqueda), la función `setSearch`
 *                     para actualizar el valor de búsqueda, y las funciones `handleRemove` y `handleSearch`
 *                     para limpiar el campo o realizar la búsqueda respectivamente.
 *
 * @example
 * const { search, setSearch, handleSearch, handleRemove } = useSearchbar();
 *
 * // Para utilizar en un formulario de búsqueda
 * <form onSubmit={handleSearch}>
 *   <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
 * </form>
 */
export default function useSearchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchValue = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearchValue);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch !== initialSearchValue) {
      router.push(`?search=${encodeURIComponent(debouncedSearch)}&page=1`);
    }
  }, [debouncedSearch, router, initialSearchValue]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?search=${search}&page=1`);
  };

  const handleRemove = () => {
    setSearch("");
    router.push("?page=1");
  };
  return { search,setSearch, handleRemove, handleSearch };
}
