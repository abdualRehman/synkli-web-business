
import { toast } from "react-toastify";


export const toastHandler = (message, type) => {
    if(type === "success") {
      toast.success(message, {
        autoClose: 1000,
    })
    }else if(type === "error") {
      toast.error(message, {
        autoClose: 1000, // Duration in milliseconds (e.g., 3000ms = 3 seconds)
    })
    }

};
