import { FaRegCircleCheck } from "react-icons/fa6";
import { FileHistory } from "#/@types"

type Props = {
    histories: FileHistory[]
}

export default function UploadHistory({ histories }: Props) {
    if (!histories) return null
    return (
        <div>
            {histories.map((history, i) => (
                <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-5 py-2 border-b border-gray-200">
                    <img src={history.file as string} alt="tumbnail" className="size-10 md:size-14 rounded-xl object-cover border border-gray-300" />
                    <div className="w-full flex-center items-start md:items-center gap-5">
                        <div className="w-full space-y-2">
                            <div className="flex-center justify-between md:justify-start gap-2">
                                <p className="font-semibold !-tracking-wide text-xs md:text-sm">{history.metadata?.name}</p>
                                <p className="text-center text-[0.65rem] md:text-xs bg-gray-200 rounded-full px-2 py-[0.05rem]" aria-label="badge">{history.type}</p>
                            </div>
                            <p className="text-gray-400 text-[0.65rem] md:text-xs">{(history.metadata?.size! / 1000_000).toFixed(2)} MB</p>
                        </div>
                        <FaRegCircleCheck className="text-green-500 text-2xl" />
                    </div>
                </div>
            ))}
        </div>
    )
}