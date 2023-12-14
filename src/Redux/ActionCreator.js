import axios from "axios"
import { AddRequest, DeleteRequest, EditRequest, ShowRequest, UpdateRequest, getAllRequestSuccess, getRequestFail, makeRequest, showLoader } from "./Action"
import { toastErrorr, toastSuccesss } from "../Helper/ToastMessage"

export const GetAllUsers = () => {
    return (dispatch) => {
        dispatch(makeRequest())
        axios.get("http://localhost:8000/users").then((res) => {
            const _list = res.data;
            dispatch(getAllRequestSuccess(_list));
        }).catch((err) => {
            dispatch(getRequestFail(err.message));
        })
    }
}

export const CreateNewUser = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/users", data).then((res) => {
            dispatch(AddRequest(data));
            toastSuccesss('User created successfully')
        }).catch((err) => {
           toastErrorr('Faild to create user due to :' + err.message)
        })
    }
}

export const EditSelectedUser = (data) => {
    return (dispatch) => {
        axios.get("http://localhost:8000/users/" + data).then((res) => {
            const _obj = res.data
            dispatch(EditRequest(_obj));
        }).catch((err) => {
            toastErrorr('Faild to fetch the data')
        })
    }
}

export const UpdateSelectedUser = (data) => {
    return (dispatch) => {
        axios.put("http://localhost:8000/users/" + data.id, data).then((res) => {
            dispatch(UpdateRequest(data));
            toastSuccesss('User updated successfully')
        }).catch((err) => {
            toastErrorr('Faild to update user due to :' + err.message)
        })
    }
}

export const DeleteSelectedUser = (data) => {
    return (dispatch) => {
        axios.delete("http://localhost:8000/users/" + data).then((res) => {
            dispatch(DeleteRequest(data));
            dispatch(showLoader(false))
            toastSuccesss('User deleted successfully')
        }).catch((err) => {
            dispatch(showLoader(false))
            toastErrorr('Faild to deleted user due to :' + err.message)
        })
    }
}

export const showSelectedUser = (data) => {
    return (dispatch) => {
        axios.get("http://localhost:8000/users/" + data).then((res) => {
            const _obj = res.data
            dispatch(ShowRequest(_obj));
        }).catch((err) => {
            toastErrorr('Faild to fetch the data')
        })
    }
}
