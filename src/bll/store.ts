import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionType, appReducer } from "./appReducer";
import {UsersActionType, usersReducer } from "./usersReducer";
import {MessagesActionType, messagesReducer } from "./messagesReducer";


const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
    messages: messagesReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActionsType = AppActionType | UsersActionType | MessagesActionType

export const useAppDispatch = store.dispatch as ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store // for dev