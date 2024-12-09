"use client";
import { PaginationProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Componente de paginación para navegar entre las páginas de productos.
 * Este componente renderiza botones de navegación que permiten al usuario ir a la
 * página anterior, siguiente o a una página específica.
 *
 * @param {PaginationProps} props - Las propiedades del componente que incluyen la
 *                                  página actual y el número total de páginas.
 * @returns {JSX.Element} - Un elemento de interfaz de usuario que representa
 *                          los controles de paginación.
 */
export default function Pagination({
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || "1");

  const [current, setCurrent] = useState(pageFromUrl);

  // Efecto para actualizar el estado de la página cuando la URL cambia
  useEffect(() => {
    setCurrent(pageFromUrl);
  }, [pageFromUrl]);

  /**
   * Función para navegar a una página específica.
   * @param {number} page - El número de la página a la que se desea navegar.
   */
  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?search=${searchParams.get("search") || ""}&page=${page}`);
    }
  };

  return (
    <section className="flex justify-center items-center w-full gap-x-4">
      <button
        aria-label="Previous page"
        onClick={() => navigateToPage(current - 1)}
        className={`btn btn-ghost ${current <= 1 ? "btn-disabled" : ""}`}
        disabled={current === 1}
      >
        {"<"}
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            aria-label={`Page ${pageNumber}`}
            onClick={() => navigateToPage(pageNumber)}
            className={`btn btn-ghost ${
              pageNumber === current ? "btn-active" : ""
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        aria-label="Next page"
        onClick={() => navigateToPage(current + 1)}
        disabled={current >= totalPages}
        className={`btn btn-ghost ${current >= totalPages ? "btn-disabled" : ""}`}
      >
        {">"}
      </button>
    </section>
  );
}
