import React, { useRef, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuth } from '../Contexts/AuthContext'
import axios from 'axios';
import { ChatEngine } from 'react-chat-engine';

export default function Chats() {
    const nav = useNavigate();
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
   
    async function handleLogout()  {
        await auth.signOut();
        nav("/");
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();

        return new File ([data], "userPhoto.jpg", {type: "image/jpeg"});
    }

    useEffect(() => {
        if (!didMountRef.current){
            didMountRef.current = true
        }
        if(!user || user === null){
            nav("/");

            return
        }

        axios.get( 
            'https://api.chatengine.io/users/me/', 
            { headers: {
                "project-id": "6d7a9394-e145-4502-92c7-0b46ae4c1ffa",
                "user-name": user.email,
                "user-secret": user.uid
            }}
        
        )
        .then(() => {setLoading(false);

        })
        .catch(e => {
            let formdata = new FormData()
            formdata.append("email", user.email)
            formdata.append("username", user.email)
            formdata.append("secret", user.uid)

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append("avatar", avatar, avatar.name)

                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        {headers: {"private-key":"f739f990-1f36-4580-9d8f-989bd2b85c7d"}}
                    )

                    .then(() => setLoading(false))
                    .catch(e => console.log("e", e.response))
                })
        })

    }, [user, nav]);

    if (!user || loading) return <div />

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    SociDesk
                </div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>

            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID= "6d7a9394-e145-4502-92c7-0b46ae4c1ffa"
                userName={user.email}
                userSecret={user.uid}
            />
            
        </div>
    )
}