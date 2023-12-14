import { MAKE_REQ, REQ_ADD_SUCC, REQ_EDIT_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_SHOW_LOADER, REQ_SHOW_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const initialstate = {
    isLoading: false,
    usersList: [],
    singleUserObj: {},
    showUserObj: {},
    errorMessage: "",
    showLoading: false
}

export const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isLoading: true
            }
        case REQ_GETALL_SUCC:
            return {
                ...state,
                isLoading: false,
                usersList: action.payload
            }
        case REQ_GETALL_FAIL:
            return {
                ...state,
                isLoading: false,
                usersList: [],
                errorMessage: action.payload
            }

        case REQ_ADD_SUCC:
            const _inputData = { ...action.payload };
            // for generate random id 
            const _maxid = Math.max(...state.usersList.map(o => o.id))
            _inputData.id = _maxid + 1
            return {
                ...state,
                usersList: [...state.usersList, _inputData],
            }

            case REQ_EDIT_SUCC:
                return {
                    ...state,
                    singleUserObj:action.payload
                }

            case REQ_SHOW_SUCC:
                return {
                    ...state,
                    showUserObj:action.payload
                }

        case REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            // compare is this selected row data or not for edit
            const _finalData = state.usersList.map((item) => {
                return item.id === _data.id ? _data : item
            })
            return {
                ...state,
                usersList: _finalData,
            }

            case REQ_UPDATE_SUCC:
                const _filterData = state.usersList.filter((data) => {
                    return data.id != action.payload
                })
                return {
                    ...state,
                    usersList: _filterData,
                }

            case REQ_SHOW_LOADER :
                return {
                    ...state,
                    showLoading: action.payload
                }

        default:
            return state
    }
}