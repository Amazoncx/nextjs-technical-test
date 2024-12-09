import React from "react";
import ProductTable from "./ProductTable";
import { ProductContainerProps } from "@/types";
import NoProducts from "./NoProducts";

export default function ProductContainer({ products }: ProductContainerProps) {
  return (
    <section className="flex flex-col items-center justify-center w-full overflow-x-auto">
      <table className="table w-2/3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="md:min-w-[400px]">Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {!products.length ? (
            <NoProducts />
          ) : (
            products.map((product) => (
              <ProductTable key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
