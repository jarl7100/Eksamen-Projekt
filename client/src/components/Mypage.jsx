import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


export default function Mypage() {


    const [ifSignedIn, displaySignedIn] = useState(<h1>sign in or sign up to see My page</h1>)
    
        const changeOnSignIn = () => {
            displaySignedIn(            
            <h1>Here are some cool cryptoscurrencyes and news stories for you (navn):</h1>,
            )
        }


    return (
        <div>
                    {ifSignedIn}
        <Button variant="outlined" onClick={changeOnSignIn}>
            Click
        </Button>
        </div>

    )
}
