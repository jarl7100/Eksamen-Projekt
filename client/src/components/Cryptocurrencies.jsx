import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import millify from 'millify';
import { Link } from 'react-router-dom';
import icon from '../images/Bitcoin.svg.png';

export const Cryptocurrencies = () => {

    return (
        <Card sx={{ maxWidth: 200, maxHeight: 200, borderRadius: '16px' }}>
            <CardActionArea style={{}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={icon}
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h8" component="div">
                        Bitcoin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default Cryptocurrencies