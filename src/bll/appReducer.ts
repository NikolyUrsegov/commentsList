import {appAPI} from "../api/api"
import {AppThunk} from "./store"
import axios, {AxiosError} from "axios";
import {getMessagesTC} from "./messagesReducer";
import {getUsersTC} from "./usersReducer";


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "idle" as RequestStatusType,
    userId: '',
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        case "APP-INITIALIZED": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        case "APP/SET-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        case "APP/SET-USER-ID": {
            return {...state, userId: action.payload.userId}
        }
        default:
            return state
    }

}

// Types
export type AppActionType = AppInitializedACType
    | SetAppErrorACType
    | SetAppStatusACType
    | SetUserIdACType

export type SetUserIdACType = ReturnType<typeof setUserIdAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type AppInitializedACType = ReturnType<typeof appInitializedAC>


//actions
export const setUserIdAC = (userId: string) => {
    return {
        type: 'APP/SET-USER-ID',
        payload: {
            userId
        }
    } as const
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        payload: {
            status
        }
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

export const appInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP-INITIALIZED",
        payload: {
            isInitialized
        }
    } as const
}

//thunks
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    dispatch(appInitializedAC(false))
    try {
        dispatch(getUserIdTC())
        dispatch(getUsersTC())
        dispatch(getMessagesTC())
    } catch (e) {

        const err = e as Error | AxiosError
        console.log(err.message)
        dispatch(setAppErrorAC(err.message))
    } finally {
        dispatch(appInitializedAC(true))
    }

}


export const getUserIdTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await appAPI.me()
        dispatch(setUserIdAC(res.data.answer.me.id))
    } catch (e) {
        const err = e as Error | AxiosError
        console.log(err.message)
        dispatch(setAppErrorAC(err.message))
    }

}


