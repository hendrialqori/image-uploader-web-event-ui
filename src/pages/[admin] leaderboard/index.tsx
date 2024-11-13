import React from "react"
import { io } from "socket.io-client";
import { LEADERBOARD, SERVER } from '#/constant';

const client = io(SERVER, {
    autoConnect: false
})


export default function AdminLeaderboardPage() {
    const [leaderboard, setLeaderboard] = React.useState([])

    React.useEffect(() => {
        // connect socket when mounted
        client.connect()

        return () => {
            // disconnect socket when unmounted
            client.disconnect()
        }
    }, [])

    React.useEffect(() => {
        client.on(LEADERBOARD, (data: []) => {
            console.log(data)
        })
    }, [])

    return (
        <main className="relative min-h-screen w-full bg-cover bg-center">
            <img src="/pertamina-1.webp" alt="pertamina-img" className="absolute h-screen w-full object-cover bg-center" />
        </main>
    )
}


