import { toast } from "react-toastify";

export function toastSuccesss (text){
    // console.log(text);
    toast.success(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        // backgroundColor: "blue",
        zIndex : 1000,
        });
}
export function toastErrorr (text){
    toast.error(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        zIndex : 1000,
        });
}