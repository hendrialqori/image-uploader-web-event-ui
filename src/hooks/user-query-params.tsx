import { useSearchParams } from "react-router-dom";
import * as CONST from "#/constant"

const queryKeys =
    [CONST.SORT_KEY, CONST.SORT_TYPE, CONST.USER_SEARCH,
    CONST.USER_ID, CONST.USER_NAME, CONST.USER_SUSPEND, CONST.PAGE]

export default function useQueryParams() {
    const [queryParams, setQueryParams] = useSearchParams()

    function setQueryIntoParams(key: string, value: string) {
        setQueryParams((prev) => {

            if (!value) {
                prev.delete(key)
                return prev
            }

            prev.set(key, value)
            return prev
        })
    }

    function clearQuery() {
        setQueryParams((prev) => {
            queryKeys.forEach((query) => {
                prev.delete(query)
            })

            return prev
        })
    }

    return { query: queryParams, setQuery: setQueryIntoParams, clearQuery }
}