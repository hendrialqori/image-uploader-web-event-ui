import React from "react";
import cup_1 from "#/assets/cup-1.svg"
import cup_2 from "#/assets/cup-2.svg"
import cup_3 from "#/assets/cup-3.svg"
import type { Placement } from "#/@types";
import { cn } from "#/utils";

type Props = {
    data: Placement[]
}

export default function BigThreePlacement({ data }: Props) {
    return (
        <div className="bg-pertamina-blue px-2 md:px-14 py-12">
            <div className="flex justify-between items-center" aria-label="big-3-placement">
                {data.map((placement, i) => (
                    <TopRank key={i}  {...placement} />
                ))}
            </div>
        </div>
    )
}

function TopRank({ rank, username, is_suspend, point, total_upload }: Placement) {
    const CUP_ICON = React.useMemo(() => ({
        1: cup_1,
        2: cup_2,
        3: cup_3
    }), [])

    return (
        <figure className="flex flex-col items-center gap-3">
            <img src={CUP_ICON[rank as keyof typeof CUP_ICON]} alt="cup-ranking-icon" className="size-8 md:size-auto" />
            <figcaption className="text-center">
                <p className={cn(is_suspend ? "text-red-400" : "text-white", "text-xs md:text-xl")}>{username ?? "[Unknown]"}</p>
                <p className="text-[0.65rem] md:text-base text-pertamina-sky-blue">{point ?? 0} pts ({total_upload ?? 0} photos)</p>
            </figcaption>
        </figure>
    )
}