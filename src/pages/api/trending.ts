import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import redisClient from '@/utils/redisClient';
import { COINGECKO_API_URL } from '@/utils/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const redisKey = `trending-coins`;
        let response;
        let redisData = await redisClient.get(redisKey);
        if(!redisData){
            const result = await axios.get(`${COINGECKO_API_URL}/search/trending`);

            const coinIds = result.data.coins.map((coin:any)=>coin.item.id).join(',');
            const priceResult = await axios.get(`${COINGECKO_API_URL}/simple/price?ids=${coinIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
            const trendingCoins = [];
            for(let coin of result.data.coins){
                trendingCoins.push({
                    name:coin.item.name,
                    ...priceResult.data[coin.item.id]
                })
            }

            // Cache / Update Frequency: every 10 minutes
            await redisClient.set(redisKey, JSON.stringify(trendingCoins), 'EX', 600);
            response = trendingCoins;
        }else{
            response = JSON.parse(redisData);
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data : top trending' });
    }
}