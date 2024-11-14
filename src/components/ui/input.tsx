import React from "react"

type Refs = HTMLInputElement
type Props = React.ComponentPropsWithoutRef<"input">

const Input = React.forwardRef<Refs, Props>(({ ...rest }, refs) => {
    return (
        <input
            ref={refs}
            type="text"
            className="w-full rounded-[0.6rem] bg-[#F2F2F2] border border-pertamina-blue/30 py-2 text-center placeholder:text-pertamina-blue/40 focus:outline-2  focus:outline-pertamina-blue"
            {...rest}
        />
    )
})

export default Input