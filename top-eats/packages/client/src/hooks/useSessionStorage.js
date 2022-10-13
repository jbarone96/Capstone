import {useState, useEffect} from "react";

export const useSessionStorage = (key, fallback) => {
    const [value, setValue] = useState(
        key ? JSON.parse(sessionStorage.getItem(key)) : fallback
    )

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue];
}