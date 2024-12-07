import { useState, useEffect } from 'react';

/**
 * Custom hook to manage query parameters for search and pagination.
 * This hook synchronizes the search query and the current page with the URL parameters.
 */
const useQueryParams = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('search') || '';
      const page = parseInt(params.get('page') || '1', 10);

      setSearchQuery(query);
      setCurrentPage(page);
    }
  }, []); // Empty dependency array to run only once

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
  };
};

export default useQueryParams;
