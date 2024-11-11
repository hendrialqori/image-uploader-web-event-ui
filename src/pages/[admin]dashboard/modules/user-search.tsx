import useQueryParams from "#/hooks/user-query-params"
import { USER_SEARCH } from "#/constant"

export default function UserSearch() {
    const { query, setQuery } = useQueryParams()
    const userSearch = query.get(USER_SEARCH) ?? ""

    function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setQuery(USER_SEARCH, value)
    }

    return (
        <div className="flex flex-col gap-1 text-[0.7rem] md:text-sm w-full">
            <label htmlFor="_" className="font-medium !-tracking-wide text-gray-700">Search user</label>
            <input id="_" type="text" value={userSearch} onChange={handleChangeQuery} className="w-full rounded-md bg-gray-50 py-2 px-3 border border-gray-200 focus:outline-1 focus:outline-black" />
        </div>
    )
}