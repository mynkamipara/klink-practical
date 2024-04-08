import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import redisClient from '@/utils/redisClient';
import { COINGECKO_API_URL } from '@/utils/config';

interface queryProps {
    id?:string,
    days?:string,
    vs_currency?:string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, days, vs_currency }:queryProps = req.query;

        const queryObject: any = {
            vs_currency,
            days
        }
        if (days != '1') {
            Object.assign(queryObject, { interval:'daily' })
        }

        const queryString = new URLSearchParams(queryObject).toString();

        const redisKey = `chart-${id}-${vs_currency}-${days}`;
        let response;
        let redisData = await redisClient.get(redisKey);
        if (!redisData) {
            const result = await axios.get(`${COINGECKO_API_URL}/coins/${id}/market_chart?${queryString}`);
            response = result.data;

            let cache_ttl = 30;
            if(days){
                if(parseInt(days) >= 2 || parseInt(days) <= 90){
                    cache_ttl = 1800
                }
                if( parseInt(days) > 90){
                    cache_ttl = 43200
                }
            }
           
            // Cache / Update Frequency: every 30, 1800, 43200 sec
            await redisClient.set(redisKey, JSON.stringify(response), 'EX', cache_ttl);
        } else {
            response = JSON.parse(redisData);
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data : graph' });
    }
}