'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
    searchTerm: string | string[]
}

const Search = ({ searchTerm }: Props) => {
    const [search, setSearch] = useState(searchTerm)
    const router = useRouter()

    const debouncedSearch = useDebouncedCallback(async (value: string) => {
        router.push(`?q=${value}`)

    }, 500) // 500ms delay

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        if (value.length >= 1) {
            debouncedSearch(value)
        } else if (value.length == 0) {
            router.push(`/dashboard`)
        }

    }

    return (
        <label className="input input-bordered flex items-center gap-2 w-1/2 mx-auto">
            <input type="text" className="grow" placeholder="Search" onChange={handleInputChange} value={search} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
            </svg>
        </label>
    )
}

export default Search