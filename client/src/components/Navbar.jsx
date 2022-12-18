import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Tab, Tabs, Avatar } from '@mui/material';
import menuIcon from '../images/cbs-crypto-hub-low-resolution-logo-white-on-transparent-background.png'
import { GlobalState } from '../GlobalState';


const Navbar = () => {
    const [signInButton, setSignInButton] = useState(
    <Button sx={{ marginLeft: "auto" }} variant="outlined" href='/signin' >
        Sign in
    </Button>)

    const [signUpButton, setSignUpButton] = useState(
        <Button sx={{ marginLeft: "10px" }} variant="outlined" href='/signup'>
            Sign up{" "}
        </Button>)

    const changeNavButtons = () => {
        setSignInButton("")
        setSignUpButton( <Button sx={{ marginLeft: "auto" }} variant="outlined">
        Log out{" "}
    </Button>)
}

    const [value, setValue] = useState();
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#063970' }}>
                <Toolbar>
                    <a href="/">
                        <Avatar
                            sx={{ width: 'auto', height: 50, marginRight: "20px" }}
                            variant='square'
                            src={menuIcon} />
                    </a>
                    <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary" >
                        <Tab label="Cryptos" href='/cryptos' />
                        <Tab label="News" href='/news' />
                        <Tab label="Crypto stats" href='cryptostats' />
                        <Tab label="My page" href='mypage' />      
                    </Tabs>
                    {signInButton}
                    {signUpButton}  
                    <Button sx={{ marginLeft: "10px" }} variant="outlined" onClick={changeNavButtons}>
                        change nav button
    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}


export default Navbar;

