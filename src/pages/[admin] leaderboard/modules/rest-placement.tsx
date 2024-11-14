import type { Placement } from "#/@types"

type Props = {
    data: Placement[]
}

export default function RestPlacement({ data }: Props) {
    return (
        <div className="p-2 md:p-9" role="table" aria-label="table-placement">
            {data.map((placement, i) => (
                <div key={i} className="grid grid-cols-5 text-pertamina-blue bg-gray-100 py-3 border-b border-gray-200 text-[0.65rem] md:text-base" role="row" aria-label="row">
                    <p className="px-3">{placement.rank}</p>
                    <p className="col-span-2">{placement.username ?? "[unknown]"}</p>
                    <p>{placement.point ?? 0}pts</p>
                    <p>{placement.total_upload ?? 0} photos</p>
                </div>
            ))}
        </div>
    )
}