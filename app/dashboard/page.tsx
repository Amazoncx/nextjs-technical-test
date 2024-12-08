import Pagination from "@/components/Pagination"
import Search from "@/components/Search"
import { getProducts } from "@/libs/actions/products"

export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const page = searchParams['page'] // e.g., ?page=2
    const search = searchParams['q'] // e.g., ?q=iphone

    const { products, count, error } = await getProducts(search != undefined ? search : "", page != undefined ? Number(page) : 1)

    if (error) {
        return (
            <div className="w-1/2 mx-auto h-full flex items-center">
                <div className="w-full flex flex-col gap-5">
                    <h1 className="text-center font-semibold text-lg text-gray-600">Hubo un error</h1>
                    <h2 className="text-center text-gray-600">Código: {error.code}</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="w-1/2 mx-auto h-full flex items-center">
            <div className="w-full flex flex-col gap-5">
                <h1 className="text-center mb-5 font-semibold text-lg text-gray-600">Lista de Productos</h1>

                <Search searchTerm={search} />

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {products.map(pr => {
                                return (
                                    <tr key={pr.id}>
                                        <th>{pr.id}</th>
                                        <td>{pr.name}</td>
                                        <td>{pr.description}</td>
                                        <td>${pr.price}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

                <Pagination currentPage={page != undefined ? Number(page) : 1} count={count} />
            </div>
        </div>
    )
}