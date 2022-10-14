import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "../bll/store";
import {initializeAppTC} from "../bll/appReducer";
import {postMessageTC} from "../bll/messagesReducer";
import {AddPost} from "../componets/addPost/AddPost";
import {Post} from "../componets/post/Post";

export type AddPostType = {
    message: string,
    replyTo?: number
}

function App() {
    const {isInitialized} = useAppSelector(state => state.app)
    const messages = useAppSelector(state => state.messages.messages)
    const users = useAppSelector(state => state.users.users)
    const dispatch = useAppDispatch


    const addPostHandler = (message: string, replyTo?: number) => {
        const isReplyTo = !replyTo ? messages.length : replyTo
        const post = {
            replyTo: isReplyTo,
            message
        }
        dispatch(postMessageTC(post))
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) return <div style={{height: '100vh', textAlign: 'center', padding: 300}}><h1>loading...</h1>
    </div>

    return (
        <div className="App">
            <AddPost addPostHandler={addPostHandler}/>
            {messages.map(mes => {
                    const user = users.find(user => user.id === mes.author)

                    return (
                        <Post user={user!} message={mes} key={mes.id}/>
                    )
                }
            )}
        </div>
    );
}

export default App;
