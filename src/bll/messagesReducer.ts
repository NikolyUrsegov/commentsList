import {AxiosError} from "axios"
import {appAPI, GetMessageType, MessageModal} from "../api/api"
import {setAppErrorAC} from "./appReducer"
import {AppThunk} from "./store"
import {AddPostType} from "../app/App";

const initialState = {
    messages: [] as GetMessageType[]
}

export const messagesReducer = (state = initialState, action: MessagesActionType): typeof initialState => {
    switch (action.type) {
        case "MESSAGES/SET-MESSAGES": {
            return {
                ...state,
                messages: action.payload.messages.map(mes => ({...mes, message: decodeURIComponent(mes.message)}))
            }
        }
        default:
            return state
    }
}

// Types
export type MessagesActionType = SetMessagesACType
export type SetMessagesACType = ReturnType<typeof setMessagesAC>

// Actions
export const setMessagesAC = (messages: GetMessageType[]) => {
    return {
        type: 'MESSAGES/SET-MESSAGES',
        payload: {
            messages
        }
    } as const
}

// Thunks
export const getMessagesTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await appAPI.getMessages()
        dispatch(setMessagesAC(res.data.answer.messages))
    } catch (e) {
        const err = e as Error | AxiosError
        console.log(err.message)
        dispatch(setAppErrorAC(err.message))
    }

}
export const postMessageTC = (post: AddPostType): AppThunk => async (dispatch, getState) => {
    const author = getState().app.userId

    try {
        await appAPI.postMessage({...post, author})
        dispatch(getMessagesTC())
    } catch (e) {
        const err = e as Error | AxiosError
        console.log(err.message)
        dispatch(setAppErrorAC(err.message))
    }
}

