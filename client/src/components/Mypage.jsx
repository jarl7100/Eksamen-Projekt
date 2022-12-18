import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Signup } from './Signup';
import { useGlobalState } from '../GlobalState';


export default function Mypage(props) {

    
    const [globalState] = useGlobalState()

    return (
        <div>
            {globalState.loggedIn
                ? <h1>Here are some cool cryptoscurrencyes and news stories for you (navn):</h1>
                : <h1>sign in or sign up to see My page</h1>
                }
        </div>

    )
}
