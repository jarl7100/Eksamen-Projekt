import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Row, Grid, Button, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '10',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': 'bcaf8936f1msh77011aedadd187fp1a619fjsnba022f655b69',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

export const Cryptocurrencies = () => {
const [cryptos] = useState();


    const { data,isLoading } = useQuery([], () => {
        return Axios.request(options).then((res) => res.data);
     });

    if (isLoading) {
        return <p>Loading...</p>
    }
    console.log(data)
     return (
        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
                <Card sx={{ maxWidth: 250, maxHeight: "auto", borderRadius: '16px' }}>
                <CardActionArea style={{}}>
                    <CardMedia
                        component="img"
                        image= {data.data.coins[0].iconUrl}
                        height="140"
                        width="10"
                        sx={{ width: 100, height: 100, margin: 'auto' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        {data.data.coins[0].name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Price: {millify(data.data.coins[0].price)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Market Cap: {millify(data.data.coins[0].marketCap)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Daily change: {millify(data.data.coins[0].change)}%
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 250, maxHeight: "auto", borderRadius: '16px' }}>
                <CardActionArea style={{}}>
                    <CardMedia
                        component="img"
                        image= {data.data.coins[1].iconUrl}
                        height="140"
                        width="10"
                        sx={{ width: 100, height: 100, margin: 'auto' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        {data.data.coins[1].name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Price: {millify(data.data.coins[1].price)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Market Cap: {millify(data.data.coins[1].marketCap)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        Daily change: {millify(data.data.coins[1].change)}%
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
          </Grid>
        </Grid>
      </Box>
     ) 
}



{/* <Card sx={{ maxWidth: 200, maxHeight: 200, borderRadius: '16px' }}>
<CardActionArea style={{}}>
    <CardMedia
        component="img"
        height="140"
        image={data.data.coins[0].iconUrl}
        sx={{ width: 100, height: 100, margin: 'auto' }}
    />
    <CardContent>
        <Typography gutterBottom variant="h8" component="div">
        {data.data.coins[0].name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
    </CardContent>
</CardActionArea>
</Card> */}


/*
export const Cryptocurrencies1 = () => {
     const { data } = useQuery(["cat"], () => {
       return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
    }); 

    return (
        <p> {data?.fact}</p>
        )
}

*/
export default Cryptocurrencies 
