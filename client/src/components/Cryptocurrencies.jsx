import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input } from 'antd';
import { styled } from '@mui/material/styles';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';


// Her henter vi data fra Coinranking API
const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '100',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': 'bcaf8936f1msh77011aedadd187fp1a619fjsnba022f655b69',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

// Her laves en Cryptocurrencies komponent som bliver brugt i App.jsx
export const Cryptocurrencies = () => {
const [cryptos] = useState();

// Der laves en query til Coinranking API med Axios og der bliver også lavet en isLoading state
    const { data:cryptosList,isLoading } = useQuery([], () => {
        return Axios.request(options).then((res) => res.data);
     });

    if (isLoading) {
        return <p>Loading...</p>
    }


    console.log(cryptosList)

  return (
    <>
      <Row gutter ={[20, 20]} className="crypto-card-container">
        {cryptosList.data.coins.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <a href={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies 

{/* <Box sx={{ width: '100%' }}>
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
</Box> */}
