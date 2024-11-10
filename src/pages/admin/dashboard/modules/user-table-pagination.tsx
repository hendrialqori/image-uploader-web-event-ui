import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import useQueryParams from "#/hooks/user-query-params";
import { PAGE } from "#/constant"
import { Metadata } from "#/@types";

interface Props {
    status: "pending" | "success" | "error"
    metadata: Metadata | undefined
}

export default function Pagination({ metadata }: Props) {
    const { query, setQuery } = useQueryParams()
    const currentPage = Number(query.get(PAGE) ?? 1)

    function decreasePage() {
        const newvalue = String(Math.max(1, currentPage - 1))
        setQuery(PAGE, newvalue)
    }

    function increasePage() {
        if (metadata?.to === metadata?.total_row) {
            return
        }
        setQuery(PAGE, String(currentPage + 1))
    }

    return (
        <div className="flex-center justify-between" aria-label="pagination">
            <p className="text-xs font-medium text-gray-500">Show {metadata?.from ?? 0} - {metadata?.to ?? 0} from {metadata?.total_row} participants</p>
            <div className="flex-center gap-2">
                <button className="bg-gray-100 border border-gray-200 rounded-md p-1 hover:outline hover:outline-black" onClick={decreasePage}>
                    <MdKeyboardDoubleArrowLeft className="text-xl" />
                </button>
                <button className="bg-gray-100 border border-gray-200 rounded-md p-1 hover:outline hover:outline-black" onClick={increasePage}>
                    <MdKeyboardDoubleArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    )
}