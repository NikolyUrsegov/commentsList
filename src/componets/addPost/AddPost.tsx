import React, {FormEvent, useState} from 'react';
import s from './AddPost.module.css'

type AddPostPropsType = {
    addPostHandler: (message: string, replyTo?: number) => void
}
export const AddPost: React.FC<AddPostPropsType> = ({addPostHandler}) => {
    const [newTextPost, setNewTextPost] = useState('')

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addPostHandler(newTextPost)
        setNewTextPost('')
    }

    return (
        <div className={s.block}>
            <h1>Add new post</h1>
            <form className={s.form} onSubmit={submitHandler}>
                <div className={s.areaBlock}>
                    <textarea value={newTextPost}
                              onChange={e => setNewTextPost(e.currentTarget.value)}
                              placeholder={'...Add new post'}/>
                </div>
                <button className={newTextPost.length ? s.btn : `${s.btn} ${s.disabled}`}
                        type='submit'
                        disabled={!newTextPost.length}
                >add post
                </button>
            </form>
        </div>
    );
};
