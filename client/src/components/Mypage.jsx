import React from 'react';
import { Card, Row, Col } from 'antd';
import millify from 'millify';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';


export default function Mypage() {

    const coinrankingAPI = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'change',
            orderDirection: 'desc',
            limit: '4',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': 'bcaf8936f1msh77011aedadd187fp1a619fjsnba022f655b69',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    const { data: cryptosList, isLoading } = useQuery([], () => {
        return Axios.request(coinrankingAPI).then((res) => res.data)
    });
    if (isLoading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            {window.localStorage.getItem('loggedIn') !== ""
                ? <>
                    <h1>Here are some cool cryptoscurrencyes for you {window.localStorage.getItem('loggedIn')}:</h1>
                    <Row gutter={[20, 20]} className="container-crypto">
                        {cryptosList.data.coins.map((currency) => (
                            <Col xs={24} sm={12} lg={6} className="card-crypto" key={currency.id}>
                                <a href={`/crypto/${currency.uuid}`}>
                                    <Card
                                        title={`${currency.rank}. ${currency.name}`}
                                        extra={<img className="image-crypto" src={currency.iconUrl} alt="cryptoImage" />}
                                        hoverable
                                    >
                                        <p>Price: {currency.price}</p>
                                        <p>Market Cap: {millify(currency.marketCap)}</p>
                                        <p>Daily Change: {millify(currency.change)}%</p>
                                    </Card>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </>
                : <h1>sign in or sign up to see My page</h1>
            }
        </div>
    )
}
