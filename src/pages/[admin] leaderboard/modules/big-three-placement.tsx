import React from "react";
import cup_1 from "#/assets/cup-1.svg"
import cup_2 from "#/assets/cup-2.svg"
import cup_3 from "#/assets/cup-3.svg"
import type { Placement } from "#/@types";

type Props = {
    data: Placement[]
}

export default function BigThreePlacement({ data }: Props) {
    return (
        <div className="bg-pertamina-blue px-2 md:px-14 py-12">
            <div className="flex justify-between items-center" aria-label="big-3-placement">
                {data.map((placement) => (
                    <TopRank key={placement.username}  {...placement} />
                ))}
            </div>
        </div>
    )
}

function TopRank({ rank, username, point, total_upload }: Placement) {
    const CUP_ICON = React.useMemo(() => ({
        1: cup_1,
        2: cup_2,
        3: cup_3
    }), [])

    return (
        <figure className="flex flex-col items-center gap-3">
            <img src={CUP_ICON[rank as keyof typeof CUP_ICON]} alt="cup-ranking-icon" className="size-8 md:size-auto" />
            <figcaption className="text-center">
                <p className="text-xs md:text-xl text-white">{username}</p>
                <p className="text-[0.65rem] md:text-base text-pertamina-sky-blue">{point} pts ({total_upload} photos)</p>
            </figcaption>
        </figure>
    )
}