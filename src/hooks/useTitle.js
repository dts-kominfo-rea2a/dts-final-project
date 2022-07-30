import { useEffect } from "react"

export function useTitle(title) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = `${title} - Miaowbook`
        return () => {
            document.title = prevTitle
        }
    })
}

export default useTitle