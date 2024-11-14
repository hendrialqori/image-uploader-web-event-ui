import { useRouteError } from "react-router-dom"
import { MdOutlineError } from "react-icons/md";

export function RouterError() {
    const error = useRouteError()

    if (error instanceof Error) {
        return (
            <div className="fixed inset-0 flex-center">
                <div className="font-lilita-one flex-center flex-col gap-1">
                    <MdOutlineError className="text-4xl text-pertamina-red" />
                    <p className="text-pertamina-red">Sorry, an unexpected error has occurred</p>
                    <div className="text-sm text-center">
                        <p>Error :</p>
                        <p>{error.message}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 flex-center">
            <div className="font-lilita-one flex-center flex-col gap-1">
                <MdOutlineError className="text-4xl text-pertamina-red" />
                <p className="text-pertamina-red">Sorry, an unexpected error has occurred</p>
            </div>
        </div>
    )

}