
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Skeleton, Space, Table, Tag } from 'antd';

const urlFinnhubCompanyProfile2 = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
const tokenFinnhub = 'chdons9r01qk9rb2m89gchdons9r01qk9rb2m8a0';


export default function Monitor({securitiesList}) {

console.log(`Tickers to be fetched : ${securitiesList.join(' ')}`);

let [data, setData] = useState([]);

// Function that builds [dataSource] required to render the <Table> antd Component
async function getData() {
    let info = [];
    for (let i=0; i < securitiesList.length; i++) {
        try {
            let responseProfile2 = await axios.get(`${urlFinnhubCompanyProfile2}${securitiesList[i]}&token=${tokenFinnhub}`);
            let securityData = responseProfile2.data;
            if (Object.keys(securityData).length > 0) {securityData.key = i; info = [...info, securityData]};
        }
        catch (error) {console.log(error)};
    };
    setData(info);
};
    
useEffect(() => {console.log('effect ran'); getData();}, [securitiesList]);

// Setting of the [Columns] required to render the <Table> antd Component
const Columns = [
    {title: 'Ticker', dataIndex: 'ticker', key: 'ticker'},
    {title: 'Company Name', dataIndex: 'name', key: 'name'},
    {title: 'Industry', dataIndex: 'finnhubIndustry', key: 'finnhubIndustry'},
    {title: 'web', dataIndex: 'weburl', key: 'weburl'},
    {title: 'WatchList', dataIndex: 'action', render: (_, record) => ( <Tag>{record.ticker}</Tag> )}
];

console.log(data);

return (
    <>
    <Skeleton active loading={data.length === 0} title={false} paragraph={{rows: 2, width: 800}}>
        <Table dataSource={data} columns={Columns} />
    </Skeleton>
    </>);
};


// const urlFinnhubCompanyRecommendation = 'https://finnhub.io/api/v1/stock/recommendation?symbol=';

// Asynchronous function with potential concurrency of actions if the below API call is added
// let responseRecommendation = axios.get(`${urlFinnhubCompanyRecommendation}${securitiesList[i]}&token=${tokenFinnhub}`);
// let recommendation = (await responseRecommendation).data;
// let securityData = Object.assign(profileInfo, recommendation[0]);