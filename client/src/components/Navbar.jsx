import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Tab, Tabs, Avatar } from '@mui/material';
import menuIcon from '../images/cbs-crypto-hub-low-resolution-logo-white-on-transparent-background.png'


const Navbar = () => {
    const [value, setValue] = useState();
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#063970' } }>
                <Toolbar>
                    <Avatar 
                    onClick={() => setValue()}
                    sx={{ width: 'auto', height: 50, marginRight: "20px"}}
                    variant='square'
                    src={menuIcon} />
                    <Tabs textColor="inherit" value={value} onChange={(e,value) => setValue(value)} indicatorColor="primary" >
                        <Tab label="Cryptos" href='/cryptos'/>
                        <Tab label="News" href='/news'/>
                        <Tab label="Crypto stats" href='cryptostats' />
                    </Tabs>
                    <Button sx={{ marginLeft: "auto" }} variant="outlined" href='/signin' >
                        sign in{" "}
                    </Button>
                    <Button sx={{ marginLeft: "10px" }} variant="outlined" href='/signup'>
                        Sign up{" "}
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}


export default Navbar;
