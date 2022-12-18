import React, { useState, useEffect } from 'react';
import { Avatar, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Box, Button, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from "axios";
import { log } from 'util';

const theme = createTheme();
const baseurl = "http://localhost:8080"
´
export function Signup(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        window.localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem('loggedIn')));
    }, []);

    const registerUser = async (username, password) => {
        console.log("registering user:" + username + " " + password)
        let loginData = {
            "username": username,
            "password": password
        }
        let jsonData = JSON.stringify(loginData)
        var config = {
            method: 'POST',
            url: 'http://localhost:8080/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonData
        };

        console.log("json:" + jsonData)

        axios(config)
            .then(function (response) {
                console.log("register done")

                setLoggedIn(true)

                window.location.href = '/mypage';
            })
            .catch((err) => {
                console.log(err)
                message = "Der er opstået en fejl"
                alert(message)
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        registerUser(data.get("username"), data.get("password"))
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="uname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Signup
