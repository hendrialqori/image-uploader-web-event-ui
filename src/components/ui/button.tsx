import React from "react"

type Refs = HTMLButtonElement
type Props = React.ComponentPropsWithoutRef<"button">

const Button = React.forwardRef<Refs, Props>(({ children, ...rest }, refs) => {
    return (
        <button
            ref={refs}
            className="relative overflow-hidden text-center w-full text-2xl enabled:bg-gradient-to-r enabled:from-forest-green enabled:to-pertamina-blue text-white disabled:text-white disabled:bg-[#B1B1B1] rounded-[0.65rem] py-3"
            {...rest}
        >
            {children}
        </button>
    )
})

export default Button