import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useSearchAndPagination = (initialSearch = '', initialPage = 1) => {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      setSearch(query.get('search') || '');
      setPage(parseInt(query.get('page') || '1', 10));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (page) query.set('page', page.toString());
      router.push(`?${query.toString()}`, undefined );
    }
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);


  return { search, setSearch, page, setPage };
};

export default useSearchAndPagination;