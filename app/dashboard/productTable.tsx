'use client'
import { TextInput } from "@/components/dataInput/textInput";
import DownArrowIcon from "@/components/icons/downArrowIcon";
import FilterIcon from "@/components/icons/filterIcon";
import UpArrowIcon from "@/components/icons/upArrowIcon";
import EmptySearch from "@/components/ilustrations/emptySearch";
import { fetchData } from "@/libs/actions/products";
import { formatCurrency } from "@/libs/utils";
import { Product, ProductFilter, ProductSort, SearchParams, Sortables, TableOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchRPP } from "./config";

export default function ProductTable({
    initialData,
    initialCount = 0,
    initialPage = 1,
    initialSort = {},
    initialFilters = {
        searchString: '',
        minPrice: 0,
        maxPrice: 0
    },

}: {
    initialData: Product[]
    initialCount: number
    initialPage?: number
    initialSort?: ProductSort
    initialFilters?: ProductFilter
}) {

    /** Initial table data **/
    const [products, setProducts] = useState(initialData)
    const [count, setCount] = useState(initialCount)
    const [totalPages, setTotalPages] = useState(Math.ceil(initialCount / searchRPP))

    /** Filter and search related **/
    const [page, setPage] = useState(initialPage)
    const [sort, setSort] = useState(initialSort)
    const [searchString, setSearchString] = useState(initialFilters.searchString)
    const [minPrice, setMinPrice] = useState(formatCurrency(initialFilters.minPrice.toString()))
    const [maxPrice, setMaxPrice] = useState(formatCurrency(initialFilters.maxPrice.toString()))
    const [filter, setFilter] = useState(initialFilters)
    
    /** Input debouncers **/
    const debounceTime = 500;
    const [debounceSearchString, setDebounceSearchString] = useState(null)
    const [debouncePrice, setDebouncePrice] = useState(null)

    /** Page states **/
    const [loading, setLoading] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [priceError, setPriceError] = useState(false);

    /** Navigation **/
    const router = useRouter();

    /**
     * Given new options (page, sorting or filter) makes a requests and gers new results
     */
    const doSearch = async ({
        newPage,
        newSort = sort,
        newFilter = filter
    }: {
        newPage?: number
        newSort?: ProductSort
        newFilter?: ProductFilter
    }) => {

        setLoading(true);

        //If we changed any option but the page, the page resets to frist page
        if (!newPage) {
            setPage(1)
            newPage = 1
        }

        const params: TableOptions = {};
        const searchParams: SearchParams = {}

        if (newPage > 1) {
            params.page = newPage;
            searchParams.page = newPage.toString()
        }
        if (newSort.column) {
            params.sort = newSort;
            searchParams.sort = newSort.column
            searchParams.dir = newSort.asc ? 'asc' : 'desc'
        }
        if (newFilter) {
            params.filter = newFilter
            if (newFilter.searchString) {
                searchParams.searchString = newFilter.searchString
            }
            if (newFilter.minPrice) {
                searchParams.minPrice = newFilter.minPrice.toString()
            }
            if (newFilter.maxPrice) {
                searchParams.maxPrice = newFilter.maxPrice.toString()
            }
        }

        //Push the new URL so we can go back to the previous result or share the page
        const url = new URLSearchParams(searchParams);
        router.push(`?${url}`);

        const { products: newData, count } = await fetchData(params);
        setLoading(false)
        setProducts(newData);
        setCount(count);
    }

    const nextPage = () => {
        const newPage = page + 1;
        setPage(newPage)
        doSearch({ newPage });
    }

    const prevPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage)
            doSearch({ newPage });
        }
    }

    const handleSort = (column: Sortables) => {
        const newSort = { ...sort }
        if (column === sort.column) {
            newSort.asc = !newSort.asc
        } else {
            newSort.column = column
            newSort.asc = true
        }
        setSort(newSort);
        doSearch({ newSort })
    }

    const handleMinPriceChange = (number: string) => {
        const formattedValue = formatCurrency(number);
        setMinPrice(formattedValue);
    };

    const handleMaxPriceChange = (number: string) => {
        const formattedValue = formatCurrency(number);
        setMaxPrice(formattedValue);
    };

    const clearFilters = () => {
        doSearch({ newFilter: {
            searchString: '',
            minPrice: 0,
            maxPrice: 0
        } }).then(()=> {
            setFilter({
                searchString: '',
                minPrice: 0,
                maxPrice: 0
            })
            setSearchString('')
            setMinPrice('')
            setMaxPrice('')
        })
        setFilterOpen(false)
    }

    /** 
     * Effect fot price formatting on search input
     * Triggers new search when price has changed using a debouce to avoid too many requests
    **/
    useEffect(() => {
        setPriceError(false)
        if (debouncePrice) {
            clearTimeout(debouncePrice)
        }

        const minPriceValue = minPrice === '' ? 0 : parseInt(minPrice.replace(/\D/g, ''));
        const maxPriceValue = maxPrice === '' ? 0 : parseInt(maxPrice.replace(/\D/g, ''));

        if (minPrice !== '' && maxPrice !== '') {
            if (minPriceValue > maxPriceValue) {
                setPriceError(true);
                setLoading(false)
                return
            }
        }

        if (minPriceValue !== filter.minPrice || maxPriceValue !== filter.maxPrice) {
            setLoading(true)
            setDebouncePrice(setTimeout(() => {
                const newFilter = { ...filter, minPrice: minPriceValue, maxPrice: maxPriceValue }
                setFilter(newFilter)
                doSearch({ newFilter })
            }, debounceTime))
        } else {
            setLoading(false)
        }
    }, [minPrice, maxPrice])


    /** 
     * Triggers new search when text search has changed using a debouce to avoid too many requests
    **/
    useEffect(() => {
        if (debounceSearchString) {
            clearTimeout(debounceSearchString)
        }
        if (searchString != filter.searchString) {
            setLoading(true)
            setDebounceSearchString(setTimeout(() => {
                const newFilter = { ...filter, searchString }
                setFilter(newFilter)
                doSearch({ newFilter })
            }, debounceTime))
        } else {
            setLoading(false)
        }
    }, [searchString])

    /**
     * Effect to update total page count using total search results
     */
    useEffect(() => {
        const pages = Math.ceil(count / searchRPP)
        setTotalPages(pages)
    }, [count])

    return (
        <div className="overflow-x-auto flex flex-col">

            {/* Filters: this could be on it's own component */}
            <button className="btn btn-square mb-4 border-slate-200 sm:hidden bg-white" onClick={() => setFilterOpen(!filterOpen)}>
                <FilterIcon size={17} />
            </button>
            
            <div className={
                    `filters flex gap-10 bg-white rounded-xl p-4 mb-4 
                    ${filterOpen ? '' : 'max-sm:hidden'}
                    max-sm:fixed max-sm:w-full max-sm:h-full 
                    max-sm:z-30 max-sm:left-0 max-sm:top-0 max-sm:bg-white max-sm:p-8
                    max-sm:flex-col
                    `
                }>
                <button className="sm:hidden btn btn-circle btn-outline btn-xs absolute right-8 top-4" onClick={()=>setFilterOpen(false)}>x</button>
                <label className="form-control w-full relative">
                    <div className="label">
                        <span className="label-text">Search:</span>
                    </div>
                    <TextInput
                        value={searchString}
                        onChange={setSearchString}
                        onClear={() => setSearchString('')}
                        placeholder="Search by name or description"
                    />
                </label>

                <div className="flex gap-4">
                    <label className="form-control w-full relative max-w-52">
                        <div className="label">
                            <span className="label-text">Min. Price:</span>
                        </div>
                        <TextInput
                            inputType="numeric"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            onClear={() => setMinPrice('')}
                            placeholder="Min. Price"
                            error={priceError}
                        />
                    </label>

                    <label className="form-control w-full relative max-w-52">
                        <div className="label">
                            <span className="label-text">Max. Price:</span>
                        </div>
                        <TextInput
                            inputType="numeric"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            onClear={() => setMaxPrice('')}
                            placeholder="Max. Price"
                            error={priceError}
                        />
                    </label>
                </div>

                <div className="sm:hidden flex">
                    <button className="btn btn-ghost sm:hidden" onClick={clearFilters}>clear filters</button>
                    <button className="btn btn-primary sm:hidden flex-grow" onClick={()=>setFilterOpen(false)}>Search</button>
                </div>

            </div>

            {/* Main table */}
            <div className="relative bg-white py-4 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                {loading &&
                    <>
                        <div className="absolute w-full h-full bg-white z-10 opacity-60 left-0 top-0 rounded-xl">
                        </div>
                        <div className="absolute w-full h-full flex justify-center z-20 left-0 top-0 rounded-xl">
                            <span className="loading loading-infinity loading-lg text-primary"></span>
                        </div>
                    </>
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th className="cursor-pointer max-md:hidden" onClick={() => { handleSort('id') }}>
                                {sort.column === 'id' && sort.asc ?
                                    <UpArrowIcon className={`${sort?.column === 'id' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                    :
                                    <DownArrowIcon className={`${sort?.column === 'id' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                }
                                Id
                            </th>
                            <th className="cursor-pointer" onClick={() => { handleSort('name') }}>
                                {sort.column === 'name' && sort.asc ?
                                    <UpArrowIcon className={`${sort?.column === 'name' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                    :
                                    <DownArrowIcon className={`${sort?.column === 'name' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                }
                                Name
                            </th>
                            <th className="cursor-pointer max-sm:hidden" onClick={() => { handleSort('description') }}>
                                {sort.column === 'description' && sort.asc ?
                                    <UpArrowIcon className={`${sort?.column === 'description' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                    :
                                    <DownArrowIcon className={`${sort?.column === 'description' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                }
                                Description
                            </th>
                            <th className="cursor-pointer" onClick={() => { handleSort('price') }}>
                                {sort.column === 'price' && sort.asc ?
                                    <UpArrowIcon className={`${sort?.column === 'price' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                    :
                                    <DownArrowIcon className={`${sort?.column === 'price' ? 'text-gray-800' : 'text-gray-300'} inline mr-1`} size={18} />
                                }
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className='hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                                <th className="py-6 max-md:hidden">{product.id}</th>
                                <td>{product.name}</td>
                                <td className="max-sm:hidden">{product.description}</td>
                                <td className="sm:min-w-28">$ {product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!products?.length && (
                    <div className="flex justify-center w-full items-center flex-col">
                        <EmptySearch />
                        <p>Sorry, there are no results for your search</p>
                        <button className="btn btn-primary flex-grow btn-sm mt-4" onClick={clearFilters}>Clear filters</button>
                    </div>
                )}
            </div>

            {/* Pagination: this could be on it's own component */}
            <div className="join grid grid-cols-2 mt-4 max-sm:absolute max-sm:bottom-4 max-sm:left-4 max-sm:right-4">
                <button onClick={prevPage} className={`join-item btn border-slate-200 bg-white ${page <= 1 ? 'btn-disabled' : ''}`}>Previous page</button>
                <button onClick={nextPage} className={`join-item btn border-slate-200 bg-white ${page >= totalPages ? 'btn-disabled' : ''}`}>Next</button>
            </div>
        </div>
    )
}