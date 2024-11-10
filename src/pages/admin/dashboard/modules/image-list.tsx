import { USER_SELECT } from "#/constant";
import useQueryParams from "#/hooks/user-query-params";
import { useGetUserUploads } from "#/services/user-service";
import ImageCard from "./image-card";

export default function ImageList() {
    const { query } = useQueryParams()

    const userId = query.get(USER_SELECT) ?? ""

    const { data: images } = useGetUserUploads(userId)

    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-lg font-semibold !-tracking-wide">Images from hendri.alqori</h2>
                <p className="text-sm font-medium text-gray-500">Select user from table to show details</p>
            </div>
            <div className="grid grid-cols-1">
                {images?.data.map((image) => (
                     <ImageCard image={image} />
                ))}
            </div>
        </div>
    )
}