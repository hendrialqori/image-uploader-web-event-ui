import { IoMdCloseCircleOutline } from "react-icons/io";
import UserSearch from "./user-search";
import Table from "./user-table-data";
import Pagination from "./user-table-pagination";
import useQueryParams from "#/hooks/user-query-params";
import { useGetUsers } from "#/services/user-service";
import { PAGE, SORT_KEY, SORT_TYPE, USER_SEARCH } from "#/constant";
import useDebounce from "#/hooks/use-debounce";

export default function UserTable() {
    const { query, clearQuery } = useQueryParams()

    const page = Number(query.get(PAGE) ?? 1)
    const sort_key = query.get(SORT_KEY) ?? "username"
    const sort_type = query.get(SORT_TYPE) ?? "DESC"
    const user_search = useDebounce(query.get(USER_SEARCH) ?? "", 300)

    const users = useGetUsers({ page, sort_key, sort_type, user_search })

    return (
        <div className="space-y-5 sticky top-5 h-max">
            <div>
                <div className="flex-center justify-start gap-2">
                    <h2 className="text-lg font-semibold !-tracking-wide">Users</h2>
                    {query.size ? (
                        <button className="flex-center gap-1 bg-gray-200 rounded-full px-3 py-1 hover:outline hover:outline-black" onClick={clearQuery}>
                            <IoMdCloseCircleOutline />
                            <span className="text-xs font-semibold">Clear history</span>
                        </button>
                    ) : null}
                </div>
                <p className="text-sm font-medium text-gray-500">Listing all user who join the event</p>
            </div>
            <UserSearch />
            <Table status={users.status} data={users.data?.data} />
            <Pagination status={users.status} metadata={users.data?.metadata} />
        </div>
    )
}