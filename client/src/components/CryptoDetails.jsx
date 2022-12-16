import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';



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

    const { data:cryptoDetails} = useQuery([], () => {
        return Axios.request(option).then((res) => res.data);
     });

     const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

      const stats = [
    //   { title: 'Price to USD', value: `$ ${cryptoDetails.coin.price && millify(cryptoDetails.coin.price)}`, icon: <DollarCircleOutlined /> },
    //    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    //    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    //    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    //    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
      ];
   
    //  const genericStats = [
    //    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    //    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    //    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    //    { title: 'Total Supply', value: `$ ${cryptoDetails.supply.total && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    //    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
    //  ];


     console.log(cryptoDetails)
    return (


         <h1>coinId:  {coinId} </h1>
         )
}

export default CryptoDetails