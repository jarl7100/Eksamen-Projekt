import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Tab, Tabs, Avatar } from '@mui/material';
import menuIcon from '../images/cbs-crypto-hub-low-resolution-logo-white-on-transparent-background.png'
import axios from "axios";

const Navbar = () => {
    const [value, setValue] = useState();
    const [loggedIn, setLoggedIn] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const status = localStorage.getItem('loggedIn');
        if (status) {
            setLoggedIn(status);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    const logout = async () => {
        console.log("logout user:")
        setLoggedIn("")
        let loginData = {
        }
        let jsonData = JSON.stringify(loginData)
        var config = {
            method: 'POST',
            url: 'http://localhost:8080/logout',
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData
        };

        console.log("json:" + jsonData)

        axios(config)
            .then(function (response) {
                console.log("logout done")
                setLoggedIn("")
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err)
                alert("Der er opstået en fejl")
            });

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
                    {loggedIn !== "" 
                        ?
                        <Button sx={{ marginLeft: "10px" }} variant="outlined" onClick={logout} >
                            Logout
                        </Button>
                        :
                        <div>
                            <Button sx={{ marginLeft: "auto" }} variant="outlined" href='/signup'>
                                Sign up
                            </Button>
                            <Button sx={{ marginLeft: "10px" }} variant="outlined" href='/signin'>
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