import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: '/api/json/',
    withCredentials: true
})

export const appAPI = {
    getUsers() {
        return instance.get<ResponseType<UsersResponseType>>('users')
    },
    getMessages() {
        return instance.get<ResponseType<MessagesResponseType>>('messages')
    },
    me() {
        return instance.get<ResponseType<MeResponceType>>('me')
    },
    postMessage(message: MessageModal) {
        return instance.post<MessageModal, AxiosResponse<any>>('message', {...message})
    }
}


export type ResponseType<T = []> = {
    answer: T
    error: ErrorResponseType
}

type UsersResponseType = {
    users: UserType[]
}

type MessagesResponseType = {
    messages: GetMessageType[]
}

type MeResponceType = {
    me: {
        id: string
    }
}

export type ErrorResponseType = {
    code: number
}

export type GetMessageType = {
    id: number
    replyTo: number
    author: string
    message: string
    timestamp: number
}
export type UserType = {
    id: string
    name: string
    surname: string
    image?: string
}

export type MessageModal = {
    author: string
    message: string
    replyTo?: number
}