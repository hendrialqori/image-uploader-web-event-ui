import React from "react";
import BigThreePlacement from "./big-three-placement";
import RestPlacement from "./rest-placement";
import { io } from "socket.io-client";
import { CONNECT_ERROR, LEADERBOARD, SERVER } from "#/constant";
import type { Placement } from "#/@types";
import Flow from "#/components/control-flow";
import { CgSpinner } from "react-icons/cg";

const client = io(SERVER, {
    autoConnect: false,
    path: "/ws"
})

const STATUS_STATE = {
    loading: false,
    success: false,
    error: false
}

export default function Placement() {

    const [status, setStatus] = React.useState(STATUS_STATE)

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
        // initial loading status
        handleStatus("loading")

        client.on(LEADERBOARD, handleGetPlacement)

        client.on(CONNECT_ERROR, () => {
            handleStatus("error")
        })

        return () => {
            // clean up
            client.off(LEADERBOARD)
            client.off(CONNECT_ERROR)
        }
    }, [])

    function handleGetPlacement(data: Placement[]) {
        const state = data;
        const empty_state: Placement = { rank: null, username: null, is_suspend: false, point: null, total_upload: null };
        const temp = [
            ...state,
            ...Array.from({ length: 10 - state.length }).fill(empty_state) as Placement[]
        ].map((value, i) => ({ ...value, rank: i + 1 }))

        const bigThree = temp.slice(0, 3)
        const rest = temp.slice(3, temp.length)

        setBigThreePlacement(bigThree)
        setRestPlacement(rest)

        handleStatus("success")
    }

    function handleStatus(type: keyof typeof STATUS_STATE) {
        setStatus({ ...STATUS_STATE, [type]: true })
    }

    return (
        <React.Fragment>
            <Flow>
                <Flow.If condition={status.loading}>
                    <div className="flex-center gap-2 pb-16">
                        <CgSpinner className="animate-spin" />
                        <p className="text-sm font-medium text-pertamina-navy">Collecting placements ...</p>
                    </div>
                </Flow.If>
                <Flow.ElseIf condition={status.success}>
                    <BigThreePlacement data={bigThreePlacement} />
                    <RestPlacement data={restPlacement} />
                </Flow.ElseIf>
                <Flow.ElseIf condition={status.error}>
                    <div className="pb-16 text-sm font-medium text-red-500 text-center">
                        <p>Someting went wrong :(</p>
                        <p>Failed to collecting placements</p>
                    </div>
                </Flow.ElseIf>
            </Flow>
        </React.Fragment>
    )
}
