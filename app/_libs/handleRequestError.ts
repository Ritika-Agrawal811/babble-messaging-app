import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export const handleRequestError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>

        if (axiosError.response) {
            // If the server responded with an error status code
            const errorMessage = axiosError.response.data
            toast.error(`Error: ${errorMessage}`)
        } else {
            // If there was no response from the server
            toast.error("An error occurred while processing your request.")
        }
    } else {
        // If it's not an Axios error
        toast.error(`Error: ${error}`)
    }
}
