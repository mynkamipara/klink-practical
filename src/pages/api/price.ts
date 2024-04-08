import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import redisClient from '@/utils/redisClient';
import { COINGECKO_API_URL } from '@/utils/config';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const redisKey = `price-bitcoin-usd`;
        let response;
        let redisData = await redisClient.get(redisKey);
        
        if(!redisData){
            const result = await axios.get(`${COINGECKO_API_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
            response = result.data;

            // Cache / Update Frequency: every 60 sec
            await redisClient.set(redisKey, JSON.stringify(response), 'EX', 60);
        }else{
            response = JSON.parse(redisData);
        }
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}