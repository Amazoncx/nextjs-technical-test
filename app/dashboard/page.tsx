
import ProductContainer from "@/components/dashboard/cards/ProductContainer";
import Pagination from "@/components/dashboard/shared/Pagination";
import Searchbar from "@/components/dashboard/shared/Search";
import { getProducts } from "@/libs/actions/products";
import { SearchParamsProps } from "@/types";

export const dynamic = "force-dynamic";

export default async function Dashboard({ searchParams }: SearchParamsProps) {
  const { data, totalPages } = await getProducts(
    Number(searchParams.page) || 1,
    searchParams.search
  );

  return (
    <main className="min-h-screen p-8 pb-24 space-y-20">
      <Searchbar />
      <ProductContainer products={data} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}
