import {useState, useEffect} from "react";

export const useLocalStorage = (key, fallback) => {
    const [value, setValue] = useState(
        key ? JSON.parse(localStorage.getItem(key)) : fallback
    )

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue];
}
