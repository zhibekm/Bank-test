import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback } from "react"

export const useError = () => {
    return useCallback((text) => {
        if (text) {
            toast.error(text)
        }
    }, [])
}


