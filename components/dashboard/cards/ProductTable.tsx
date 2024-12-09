import { ProductTableProps } from "@/types";
import React from "react";

export default function ProductTable({ product }: ProductTableProps) {
  return (
    <tr className="h-[80px]">
      <td className="h-[80px] text-ellipsis overflow-hidden md:max-w-[190px]">{product.id}</td>
      <td className="h-[80px] text-ellipsis overflow-hidden md:max-w-[190px]">{product.name}</td>
      <td className="h-[80px] text-start text-ellipsis overflow-hidden md:max-w-[300px]">
        {product.description}
      </td>
      <td className="h-[80px] text-start text-ellipsis overflow-hidden  md:max-w-[100px]">
        ${product.price}
      </td>
    </tr>
  );
}
