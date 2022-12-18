import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Tab, Tabs, Avatar } from '@mui/material';
import menuIcon from '../images/cbs-crypto-hub-low-resolution-logo-white-on-transparent-background.png'

const Navbar = () => {


    const [value, setValue] = useState();

    const [loggedIn, setLoggedIn] = useState(false);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const status = JSON.parse(localStorage.getItem('loggedIn'));
        if (status) {
            setLoggedIn(status);
        }
    }, []);


    const logout = async () => {
        console.log("logout user:")
        setLoggedIn(false)
        window.location.href = '/';
    };


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
                    {loggedIn == true
                        ?
                        <Button sx={{ marginLeft: "auto" }} variant="outlined" onClick={logout} >
                            Logout
                        </Button>
                        :
                        <div>
                            <Button sx={{ marginLeft: "auto" }} variant="outlined" href='/signup'>
                                Sign up
                            </Button>
                            <Button sx={{ marginLeft: "10px" }} variant="outlined" href='/login'>
                                sign in
                            </Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}


export default Navbar;

