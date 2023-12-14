import { MAKE_REQ, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_EDIT_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_SHOW_LOADER, REQ_SHOW_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const makeRequest = () => {
    return {
        type:MAKE_REQ
    }
}

export const getAllRequestSuccess = (data) => {
    return {
        type:REQ_GETALL_SUCC,
        payload:data
    }
}

export const getRequestFail = (error) => {
    return {
        type:REQ_GETALL_FAIL,
        payload:error
    }
}

export const AddRequest = (data) => {
    return{
        type:REQ_ADD_SUCC,
        payload: data
    }
}

export const EditRequest = (data) => {
    return{
        type:REQ_EDIT_SUCC,
        payload: data
    }
}

export const UpdateRequest = (data) => {
    return{
        type:REQ_UPDATE_SUCC,
        payload: data
    }
}

export const DeleteRequest = (data) => {
    return{
        type:REQ_DELETE_SUCC,
        payload: data
    }
}

export const ShowRequest = (data) => {
    return{
        type:REQ_SHOW_SUCC,
        payload: data
    }
}


export const showLoader = (status) => {
    return {
        type : REQ_SHOW_LOADER,
        payload : status
    }
}