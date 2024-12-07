'use client';

import React, { useEffect } from 'react';
import SearchBar from '@components/SearchBar';
import Pagination from '@components/Pagination';
import useProducts from '../../libs/actions/products';
import useQueryParams from '../../libs/hooks/useQueryParams';

/**
 * Dashboard component that displays a list of products.
 * It integrates the SearchBar and Pagination components and uses the `useProducts` and `useQueryParams`.
 */

const Dashboard: React.FC = () => {
  const { searchQuery, setSearchQuery, currentPage, setCurrentPage } = useQueryParams();
  const { products, totalPages, loading } = useProducts(searchQuery, currentPage);

  // Handle search query change and reset to page 1
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <SearchBar searchQuery={searchQuery} onSearch={handleSearchChange} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card p-4 border rounded">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Dashboard;

