import ProductTable from "./productTable";
import { fetchData } from "@/libs/actions/products";
import { ProductFilter, ProductSort, SearchParams, sortableArray, Sortables } from "@/types";


const getFiltersFromSearchParams = ({ searchParams }: { searchParams?: SearchParams }) => {
    const page = parseInt(searchParams.page) || 1;
    const sort: ProductSort = searchParams.sort ? {
        column: sortableArray.includes(searchParams.sort as Sortables) ? searchParams.sort as Sortables : 'id',
        asc: searchParams.dir === 'asc'
    } : {
        column: 'id',
        asc: true
    }

    const filter: ProductFilter = {
        minPrice: 0,
        maxPrice: 0,
        searchString: ''
    }
    if (searchParams.searchString) {
        filter.searchString = searchParams.searchString
    }
    if (searchParams.minPrice) {
        filter.minPrice = parseInt(searchParams.minPrice)
    }
    if (searchParams.maxPrice) {
        filter.maxPrice = parseInt(searchParams.maxPrice)
    }

    return {
        page,
        sort,
        filter
    }
}

export default async function Dashboard ({ searchParams }: { searchParams?: SearchParams }) {

    const { page, sort, filter } = getFiltersFromSearchParams({ searchParams });

    const { products, count } = await fetchData({ page, sort, filter });

    return (
        <ProductTable initialCount={count} initialData={products} initialPage={page} initialSort={sort} initialFilters={filter} />
    )
}

