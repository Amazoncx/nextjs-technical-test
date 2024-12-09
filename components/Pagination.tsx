import { PaginationProps } from '@/types/pagination';
import React from 'react';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between mt-4 items-center gap-2">
      <button
        className="btn btn-sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Prev.
      </button>
      <span>{currentPage} de {totalPages}</span>
      <button
        className="btn btn-sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;