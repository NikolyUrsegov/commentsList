import {AxiosError} from "axios"
import {appAPI, UserType} from "../api/api"
import {setAppErrorAC} from "./appReducer"
import {AppThunk} from "./store"

const initialState = {
    users: [] as UserType[]
}

export const usersReducer = (state = initialState, action: UsersActionType): typeof initialState => {
    switch (action.type) {
        case "USERS/SET-USERS": {
            return {
                ...state,
                users: action.payload.users.map(user => ({
                    ...user,
                    name: decodeURIComponent(user.name),
                    surname: decodeURIComponent(user.surname)
                }))
            }
        }
        default:
            return state
    }
}

// Types
export type UsersActionType = SetUsersACType
export type SetUsersACType = ReturnType<typeof setUsersAC>


// Actions
export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'USERS/SET-USERS',
        payload: {
            users
        }
    } as const
}


// Thunks
export const getUsersTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await appAPI.getUsers()
        dispatch(setUsersAC(res.data.answer.users))
    } catch (e) {
        const err = e as Error | AxiosError
        console.log(err.message)
        dispatch(setAppErrorAC(err.message))
    }
}