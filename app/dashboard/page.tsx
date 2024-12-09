'use client';

import React, { useState, useEffect } from 'react';
import { getProducts } from '@/libs/actions/products';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import useSearchAndPagination from '@/hooks/useSearchAndPagination';

const Page: React.FC = () => {
  const { search, setSearch, page, setPage } = useSearchAndPagination('', 0);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'description', title: 'Description' },
    { key: 'price', title: 'Price' },
  ];

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const { data, totalPages } = await getProducts(page, search);
        setProducts(data);
        setTotalPages(totalPages);
        setLoading(false);            
    };
    fetchData();
  }, [page, search]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-9">
      <div className="w-full max-w-2xl flex flex-col items-center gap-y-10">
        <SearchBar onSearch={setSearch} placeholder="Search products" value={search} />
        {
          loading ? <span className="loading loading-dots loading-lg"></span>: 
          (<>
              <Table columns={columns} data={products || []} />
              <Pagination
                  currentPage={products?.length === 0 ? 0 : page}
                  totalPages={totalPages}
                  onPageChange={setPage} />
          </>)
        }
      </div>
    </div>
  );
};

export default Page;