import { HiDotsVertical } from "react-icons/hi";
import Popup from "./popup";
import { useCredential } from "#/services/auth-service";


const ProfilePoint = ({ name, data }: Record<"name" | "data", string>) => {
    return (
        <div>
            <p className="text-[.7rem] md:text-[0.8rem] font-medium text-slate-500">{name}</p>
            <h2 className="font-bold text-sm md:text-base">{data}</h2>
        </div>
    )
}

export default function Profile() {
    const { data: credential } = useCredential()

    return (
        <header className="flex-center items-start justify-between border-b pb-4">
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-6">
                <ProfilePoint name="You’re logged as" data={credential?.data.username ?? "-"} />
                <ProfilePoint name="Current point" data={`${credential?.data.point ?? 0}pts`} />
            </div>
            <div>
                <Popup>
                    {(props) =>
                        <button
                            className="p-2 rounded-md bg-slate-50 hover:outline active:bg-gray-200 transition duration-300"
                            onClick={props.toggle}
                        >
                            <HiDotsVertical className="text-lg md:text-2xl" />
                        </button>
                    }
                </Popup>
            </div>
        </header>
    )
}
