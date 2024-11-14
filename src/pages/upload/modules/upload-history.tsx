import { FaRegCircleCheck } from "react-icons/fa6";
import useCredentialStore from "#/stores/credential";
import { useGetUserUploads } from "#/services/user-service";
import { STATIC } from "#/constant";


export default function UploadHistory() {
    const userId = useCredentialStore((state) => state.id)
    const { data: images, status, fetchStatus } = useGetUserUploads(userId!)

    const isPending = status === "pending" && fetchStatus === "fetching";

    if (isPending) return null

    return (
        <div>
            {images?.data.map((image, i) => (
                <div key={i} className="flex flex-col md:flex-row items-start gap-2 md:gap-5 pt-2 pb-3 border-b border-gray-200">
                    <img src={STATIC + "/" + image.title} alt="tumbnail" className="size-10 md:size-12 rounded-xl object-cover border border-gray-300" crossOrigin="anonymous"/>
                    <div className="w-full flex-center items-start md:items-center gap-5">
                        <div className="w-full space-y-2">
                            <p className="text-center text-[0.6rem] tracking-wider bg-gray-200 rounded-full px-2 py-[0.05rem] w-max" aria-label="badge">{image.category}</p>
                            <p className="text-[0.7rem] md:text-xs text-pertamina-navy">{image.title}</p>
                        </div>
                        <FaRegCircleCheck className="text-green-500 text-2xl" />
                    </div>
                </div>
            ))}
        </div>
    )
}