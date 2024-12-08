// Custom input with clear button using daisyUI
import { useEffect, useState } from "react"

export const TextInput = ({
    onChange=()=>null,
    onClear=()=>null,
    value,
    placeholder,
    error,
    inputType='text'
}: {
    onChange?: (text: string) => void
    onClear?: () => void
    value: string
    placeholder: string
    error?: boolean
    inputType?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal"
}) => {

    const [empty, setEmpty] = useState(true)

    useEffect(()=> {
        setEmpty(value === '');
    }, [value])

    return (
        <div className={`flex border rounded-xl justify-center items-center px-4 ${error ? 'border-red-300':''}`}>
            <input 
                onChange={(e)=>{onChange(e.target.value)}} 
                type="text" 
                placeholder={placeholder}
                className="input input-ghost w-full rounded-xl focus:outline-none focus:border-transparent px-0" 
                value={value}
                inputMode={inputType}
                
            />
            {!empty && (
                <button className="btn btn-circle btn-outline btn-xs" onClick={onClear}>
                    x
                </button>
            )}
        </div>
    )
}