import React from 'react';
import { Row, Col, Statistic } from 'antd'
import { Typography } from '@mui/material';
import millify from 'millify';
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

export default function Cryptostats() {

  const { data: cryptoStats, isLoading } = useQuery([], () => {
    return Axios.request(options).then((res) => res.data);
  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Typography pb={2} variant="h4" className="heading">Crypto Stats</Typography>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={cryptoStats.data.stats.total} /></Col>
        <Col span={12}><Statistic title="Total Market Cap of cryptos:" value={`$${millify(cryptoStats.data.stats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(cryptoStats.data.stats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(cryptoStats.data.stats.totalMarkets)} /></Col>
      </Row>
    </>
  )
}