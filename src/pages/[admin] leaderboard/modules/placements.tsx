import React from "react";
import BigThreePlacement from "./big-three-placement";
import RestPlacement from "./rest-placement";
import { io } from "socket.io-client";
import { LEADERBOARD, SERVER } from "#/constant";
import type { Placement } from "#/@types";

const client = io(SERVER, {
    autoConnect: false
})

export default function Placement() {

    const [bigThreePlacement, setBigThreePlacement] = React.useState<Placement[]>([])
    const [restPlacement, setRestPlacement] = React.useState<Placement[]>([])

    React.useEffect(() => {
        // connect socket when mounted
        client.connect()

        return () => {
            // disconnect socket when unmounted
            client.disconnect()
        }
    }, [])

    React.useEffect(() => {
        client.on(LEADERBOARD, (data: Placement[]) => {
            const state = data;
            const empty_state: Placement = { rank:null, username: null, point: null, total_upload: null };
            const temp = [
                ...state,
                ...Array.from({ length: 10 - state.length }).fill(empty_state) as Placement[]
            ].map((value, i) => ({ ...value, rank: i + 1 }))

            const bigThree = temp.slice(0, 3)
            const rest = temp.slice(3, temp.length)

            setBigThreePlacement(bigThree)
            setRestPlacement(rest)

        })

        return () => {
            // clean up
            client.off(LEADERBOARD)
        }
    }, [])

    return (
        <React.Fragment>
            <BigThreePlacement data={bigThreePlacement} />
            <RestPlacement data={restPlacement} />
        </React.Fragment>
    )
}
