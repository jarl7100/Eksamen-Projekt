import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { Signup } from './Signup';

export default function Mypage(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    
    console.log("loggedIn:" + window.localStorage.getItem('loggedIn'))

    return (
        <div>
            {window.localStorage.getItem('loggedIn') === "true"
                ? <h1>Here are some cool cryptoscurrencyes and news stories for you (navn):</h1>
                : <h1>sign in or sign up to see My page</h1>
                }
        </div>
    )
}
