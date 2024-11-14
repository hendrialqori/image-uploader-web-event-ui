import { RxDotsVertical } from "react-icons/rx";
import Popup from "./popup";
import { useCredential } from "#/services/auth-service";
import useCredentialStore from "#/stores/credential";
import React from "react";


const ProfilePoint = ({ name, data }: Record<"name" | "data", string>) => {
    return (
        <div>
            <p className="text-xs text-pertamina-blue">{name}</p>
            <h2 className="text-base md:text-lg text-pertamina-navy">{data}</h2>
        </div>
    )
}

export default function Profile() {
    const { data: credential } = useCredential()
    const setId = useCredentialStore((state) => state.setId)

    React.useEffect(function setCredentialId() {
        if (credential?.data.id) setId(credential.data.id)
    }, [credential?.data.id])

    return (
        <header className="flex-center items-start justify-between border-b pb-4">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                <ProfilePoint name="You’re logged as" data={credential?.data.username ?? "-"} />
                <ProfilePoint name="Total uploaded" data={`${credential?.data.total_upload ?? 0}`} />
                <ProfilePoint name="Current point" data="Still processing" />
            </div>
            <div>
                <Popup>
                    {(props) =>
                        <button
                            className="p-2 rounded-md bg-slate-50 hover:outline active:bg-gray-200 transition duration-300"
                            onClick={props.toggle}
                        >
                            <RxDotsVertical className="text-xl" />
                        </button>
                    }
                </Popup>
            </div>
        </header>
    )
}
