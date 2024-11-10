import React from "react";

export default function useDebounce(value: string, delay: number = 100) {
    const [debounceValue, setDebounceValue] = React.useState(value)
    const [_, startTransition] = React.useTransition()

    React.useEffect(() => {
        const timer = setTimeout(() => {
            startTransition(() => {
                setDebounceValue(value)
            })
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])


    return debounceValue
}