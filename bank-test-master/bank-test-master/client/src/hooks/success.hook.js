import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback } from "react"

export const useSuccess = () => {
    return useCallback((text) => {
        if (text) {
            toast.success(text)
        }
    }, [])
}