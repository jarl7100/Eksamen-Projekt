import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Typography, Box} from '@mui/material';
import { Row, Col, Statistic} from 'antd'

import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

import HTMLReactParser from 'html-react-parser';

const CryptoDetails = ()  => {

    const { coinId } = useParams();
    const option = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
        params: {referenceCurrencyUuid: `${coinId}`, timePeriod: '24h'},
        headers: {
          'X-RapidAPI-Key': 'bcaf8936f1msh77011aedadd187fp1a619fjsnba022f655b69',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

    const { data:cryptoDetails, isLoading} = useQuery([], () => {
        return Axios.request(option).then((res) => res.data);
     });

  if (isLoading) {
      return <p>Loading...</p>
  }


     console.log(cryptoDetails)
    return ( 
      <> 

         <Typography pb={2} variant="h5" className="heading">More details about {cryptoDetails.data.coin.name}</Typography>
      <Row>
      <Col span={12}><Statistic title="All time high value in $" value={millify(cryptoDetails.data.coin.allTimeHigh.price)} /></Col>
      <Col span={12}><Statistic title="Market cap in $" value={millify(cryptoDetails.data.coin.marketCap)} /></Col>
      <Col span={12}><Statistic title="Maket cap rank" value={cryptoDetails.data.coin.rank} /></Col>
      <Col span={12}><Statistic title="Price in bitcoin" value={cryptoDetails.data.coin.btcPrice} /></Col>

      </Row>   
      <Row>
      <Typography pt={10} variant="h5" className="heading">A describtion of {cryptoDetails.data.coin.name}:</Typography>
     {HTMLReactParser(cryptoDetails.data.coin.description)}

      </Row>
      </>
         )
}

export default CryptoDetails