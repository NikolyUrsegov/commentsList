import React, {useState} from 'react';
import {useAppDispatch} from "../../bll/store";
import {postMessageTC} from "../../bll/messagesReducer";
import s from './AddToAnswer.module.css'
import sendBtn from '../../assets/image/send.svg'

type AddToAnswerPropsType = {
    replyTo: number
}

export const AddToAnswer: React.FC<AddToAnswerPropsType> = ({replyTo}) => {
    const [message, setMessage] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useAppDispatch

    const onClickHandler = () => {
        dispatch(postMessageTC({message, replyTo}))
        setIsVisible(!isVisible)
        setMessage('')
    }

    return (
        <div className={s.block}>
            {isVisible
                ? <div className={s.inputBlock}>
                    <input className={s.inp} value={message}
                           onChange={(e) => setMessage(e.currentTarget.value)}
                           onBlur={() => setIsVisible(false)}
                    />
                    <div onClick={onClickHandler} className={!message.length ? s.disabled : ''}>
                        <button className={s.btn}><img src={sendBtn}/></button>
                    </div>
                </div>
                : <button className={s.btn} onClick={() => setIsVisible(true)}>Ответить</button>
            }
        </div>
    );
};

