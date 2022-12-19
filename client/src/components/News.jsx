import React from 'react';
import { Row, Col, Avatar, Card } from 'antd'
import Typography from '@mui/material/Typography';
import moment from 'moment'
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency',
    params: {safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': 'bcaf8936f1msh77011aedadd187fp1a619fjsnba022f655b69',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export default function News() {

    const { data: cryptoNews, isLoading } = useQuery([], () => {
        return Axios.request(options).then((res) => res.data);
     });

    if (isLoading) {
        return <p>Loading...</p>
    }
    console.log(cryptoNews)

    return (
        <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (

          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="card-news">
              <a href={news.url} target = "_Blank" rel="noopener noreferrer">
                <div className='image-container-news'>
                  <Typography className='title-news' variant="h6"> {news.name}</Typography>
                  {news.image
                        ?<img style={{maxWidth: "200px", maxHeight: "100px"}}src={news.image.thumbnail.contentUrl } alt="news"/> 
                        : <img style={{maxWidth: "200px", maxHeight: "100px"}}src={demoImage} alt="news"/>
                  }
                     </div>
                <p>
                  {news.description.lenght > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                </p>
                 <div>
                 {news.provider[0].image
                        ?<Avatar style={{maxWidth: "200px", maxHeight: "100px"}}src={news.provider[0].image.thumbnail.contentUrl } alt="news"/> 
                        : <Avatar style={{maxWidth: "200px", maxHeight: "100px"}}src={demoImage} alt="news"/>
                  }
                  <Typography className='provider-name' variant="body1">{news.provider[0].name}</Typography>
                </div> 
                <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                </a>
            </Card>
          </Col>
        ))}
      </Row>
      )
}