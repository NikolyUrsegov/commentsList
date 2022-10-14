import React from 'react';
import s from './Post.module.css'
import avaDef from '../../assets/image/avatar.svg'
import {GetMessageType, UserType} from "../../api/api";
import {useAppSelector} from "../../bll/store";
import {AddToAnswer} from "../addToAnswer/AddToAnswer";
import {formatDate} from "../../assets/utils/formatDate";

type PostPropsType = {
    user: UserType
    message: GetMessageType
}
export const Post: React.FC<PostPropsType> = ({user, message}) => {
    const messages = useAppSelector(state => state.messages.messages)
    const outMes = messages.find(mes => mes.id === message.replyTo)
    const isOut = outMes && outMes.id !== message.id

    return (
        <div className={s.block}>
            <img className={s.avatar} src={user.image ? `http://localhost:8080${user.image}` : avaDef}/>
            <div className={s.content}>
                <div className={s.blockName}>
                    <h4 className={s.userName}>{user.name} {user.surname}</h4>
                    {isOut
                        ? <span className={s.outMes}><b>Ответил: </b>{outMes.message}</span>
                        : null
                    }
                </div>
                <p>{message.message}</p>
                <div className={s.blockAnswer}>
                    <span>{formatDate(message.timestamp)}</span>
                    <AddToAnswer replyTo={message.id}/>
                </div>
            </div>
        </div>
    );
};

