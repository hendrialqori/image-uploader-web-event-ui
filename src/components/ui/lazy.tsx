import { CgSpinner } from "react-icons/cg";

export function Spinner() {
    return (
        <div className="flex-center min-h-full absolute inset-0 bg-black/60">
            <CgSpinner className="animate-spin text-base md:text-2xl" />
        </div>
    )
}

export function Suspense() {
    return (
        <div className="fixed inset-0 flex-center">
            <p className="font-lilita-one text-lg text-pertamina-sky-blue">Loading ...</p>
        </div>
    )
} 