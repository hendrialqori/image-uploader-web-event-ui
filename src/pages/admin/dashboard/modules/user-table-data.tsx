import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import useQueryParams from "#/hooks/user-query-params";
import { USER_SELECT, SORT_KEY, SORT_TYPE } from "#/constant";
import React from "react";
import { User } from "#/@types";
import Flow from "#/components/control-flow";

interface Props {
    status: "pending" | "success" | "error";
    data: User[] | undefined
}

export default function Table({ status, data }: Props) {
    const { setQuery } = useQueryParams()
    const [isType, setType] = React.useState(false)

    function handleQuery(headerKey: string) {
        return () => {
            setType((prev) => !prev)

            setQuery(SORT_KEY, headerKey)
            setQuery(SORT_TYPE, isType ? "DESC" : "ASC")
        }

    }

    function selectUserById(id: string) {
        return () => setQuery(USER_SELECT, id)
    }

    return (
        <Flow>
            <Flow.If condition={status === "pending"}>
                <SkeletonRows />
            </Flow.If>
            <Flow.ElseIf condition={status === "success"}>
                <div role="table">
                    <div className="flex-center border rounded-t-lg" role="row">
                        <div className="flex-center justify-start gap-1 w-[250px] py-3 px-4">
                            <p className="!-tracking-wide text-[0.8rem] font-medium text-gray-700">Username</p>
                            <button className="-space-y-2 hover:outline hover:outline-black rounded-md px-1" onClick={handleQuery("username")}>
                                <MdKeyboardArrowUp className="text-sm" />
                                <MdKeyboardArrowDown className="text-sm" />
                            </button>
                        </div>
                        <div className="flex-center justify-start gap-1 w-[200px] py-3 px-2">
                            <p className="!-tracking-wide text-[0.8rem] font-medium text-gray-700">Point</p>
                            <button className="-space-y-2 hover:outline hover:outline-black rounded-md px-1" onClick={handleQuery("point")}>
                                <MdKeyboardArrowUp className="text-sm" />
                                <MdKeyboardArrowDown className="text-sm" />
                            </button>
                        </div>
                    </div>
                    {data?.map((user) => (
                        <div
                            key={user.id}
                            className="flex-center border-x border-b hover:bg-gray-100 transition duration-200 cursor-pointer"
                            onClick={selectUserById(user.id)}
                            role="row"
                        >
                            <div className="flex-center justify-start gap-2 w-[250px] py-3 px-4">
                                <p className="text-sm !-tracking-wide font-semibold">{user.username ?? ""}</p>
                            </div>
                            <div className="flex-center justify-start gap-2 w-[200px] py-3 px-2">
                                <p className="!-tracking-wide font-semibold">{user.point ?? 0}</p>
                                <span className="text-xs bg-gray-100 border border-gray-200 rounded-md px-3 py-1">{user.total_upload ?? 0} image uploaded</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Flow.ElseIf>
            <Flow.Else>
                <div className="w-[450px] py-10">
                    <p className="text-sm font-medium text-red-500 text-center">Someting went wrong :(</p>
                </div>
            </Flow.Else>
        </Flow>

    )
}

function SkeletonRows() {
    return (
        <div className="rounded-lg overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-[450px] h-10 bg-gray-100 border-x border-b animate-pulse" style={{ transitionDelay: `${i * 100}ms` }} />
            ))}
        </div>
    )
}