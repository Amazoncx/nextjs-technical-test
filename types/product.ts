export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}
  
export interface GetProductsResult {
    data: Product[];
    totalPages: number;
}

export interface PageProps {
    initialProducts: Product[];
    initialTotalPages: number;
    initialSearch: string;
    initialPage: number;
}