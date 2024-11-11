import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import useQueryParams from "#/hooks/user-query-params";
import { USER_ID, SORT_KEY, SORT_TYPE, USER_NAME, USER_SUSPEND } from "#/constant";
import React from "react";
import { User } from "#/@types";
import Flow from "#/components/control-flow";
import { cn } from "#/utils";

interface Props {
    status: "pending" | "success" | "error";
    data: User[] | undefined
}

export default function Table({ status, data }: Props) {
    const { query, setQuery } = useQueryParams()
    const [isType, setType] = React.useState(false)

    const idUserQuery = query.get(USER_ID) ?? ""

    function handleQuery(headerKey: string) {
        return () => {
            setType((prev) => !prev)

            setQuery(SORT_KEY, headerKey)
            setQuery(SORT_TYPE, isType ? "DESC" : "ASC")
        }

    }

    function selectUserById(id: string, name: string, is_suspend: boolean) {
        return () => {
            setQuery(USER_ID, id);
            setQuery(USER_NAME, name);
            setQuery(USER_SUSPEND, JSON.stringify(is_suspend))
        }
    }

    return (
        <Flow>
            <Flow.If condition={status === "pending"}>
                <SkeletonRows />
            </Flow.If>
            <Flow.ElseIf condition={status === "success"}>
                <div role="table">
                    <div className="grid grid-cols-2 border rounded-t-lg" role="row">
                        <div className="flex-center justify-start gap-1 py-2 md:py-3 px-4">
                            <p className="!-tracking-wide text-[0.7rem] md:text-[0.8rem] font-medium text-gray-700">Username</p>
                            <button className="-space-y-2 hover:outline hover:outline-black rounded-md px-1" onClick={handleQuery("username")}>
                                <MdKeyboardArrowUp className="text-sm" />
                                <MdKeyboardArrowDown className="text-sm" />
                            </button>
                        </div>
                        <div className="flex-center justify-start gap-1 py-2 md:py-3 px-2">
                            <p className="!-tracking-wide text-[0.7rem] md:text-[0.8rem] font-medium text-gray-700">Point</p>
                            <button className="-space-y-2 hover:outline hover:outline-black rounded-md px-1" onClick={handleQuery("point")}>
                                <MdKeyboardArrowUp className="text-sm" />
                                <MdKeyboardArrowDown className="text-sm" />
                            </button>
                        </div>
                    </div>
                    {data?.map((user) => (
                        <div
                            key={user.id}
                            className={cn(
                                "grid grid-cols-2 border-x border-b hover:bg-gray-100 transition duration-200 cursor-pointer",
                                user.id === idUserQuery ? "bg-gray-100 scale-x-[102%]" : "",
                                user.is_suspend ? "line-through text-red-500" : ""
                            )}
                            onClick={selectUserById(user.id, user.username, user.is_suspend)}
                            role="row"
                        >
                            <div className="flex-center justify-start gap-2 py-2 md:py-3 px-4">
                                <p className="text-[0.7rem] md:text-sm !-tracking-wide font-semibold">{user.username ?? ""}</p>
                            </div>
                            <div className="flex-center justify-start gap-2 py-2 md:py-3 px-2">
                                <p className="!-tracking-wide font-semibold text-[0.7rem] md:text-sm">{user.point ?? 0}</p>
                                <span className="text-[0.5rem] md:text-[0.7rem] font-medium bg-gray-100 border border-gray-200 rounded-xl px-3 py-1">{user.total_upload ?? 0} uploaded</span>
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