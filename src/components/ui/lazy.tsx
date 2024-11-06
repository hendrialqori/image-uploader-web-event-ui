import { CgSpinner } from "react-icons/cg";

export function ButtonSpinnerLoading() {
    return (
        <div className="flex-center min-h-full">
            <CgSpinner className="animate-spin text-base md:text-2xl" />
        </div>
    )
}