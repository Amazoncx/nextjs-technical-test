export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Products = Product[];

export interface ProductContainerProps {
  products: Products;
}

export interface ProductTableProps {
  product: Product;
}

export interface PaginationProps {
  totalPages: number;
}

export interface SearchParamsProps {
  searchParams: {
    search: string;
    page: string;
  };
}
