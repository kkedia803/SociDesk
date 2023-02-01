import React from 'react'
import { GoogleOutlined} from '@ant-design/icons'
import { auth } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Login() {
    return (<div id='login-page'>
        <div id='login-card'>
            <h1>WELCOME TO SOCIDESK</h1>
        </div>
        
        <div className='login-button google'
            onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>

            <GoogleOutlined /> Sign In With Google

        </div>

    </div>)
}
