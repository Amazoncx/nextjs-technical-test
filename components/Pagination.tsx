'use client'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    currentPage: number
    count: number
}

const Pagination = ({ currentPage, count }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const previous = () => {
        // Create a new URLSearchParams from existing params
        const params = new URLSearchParams(searchParams.toString())

        // Append parameter page
        params.set('page', (currentPage - 1).toString())

        // Push updated URL
        router.push(`/dashboard?${params.toString()}`)

    }

    const next = () => {
        // Create a new URLSearchParams from existing params
        const params = new URLSearchParams(searchParams.toString())

        // Append parameter page
        params.set('page', (currentPage + 1).toString())

        // Push updated URL
        router.push(`/dashboard?${params.toString()}`)
    }

    return (
        <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline" disabled={currentPage === 1} onClick={previous}>Previous page</button>
            <button className="join-item btn btn-outline" onClick={next} disabled={currentPage * 5 >= count}>Next</button>
        </div>
    )
}

export default Pagination