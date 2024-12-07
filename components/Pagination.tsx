import React from 'react';
/**
 * Pagination component that allows users to navigate between pages.
 * It receives the current page, total pages, and a callback function to handle page changes.
 */
/**
 * Componente de paginación.
 * @param {number} currentPage -
 * @param {number} totalPages -
 * @param {(page: number) => void} onPageChange -
 * @returns {JSX.Element} - 
 */
const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-primary"
        aria-label="Página anterior"
      >
        Previous
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-primary"
        aria-label="Página siguiente"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
