import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import redisClient from '@/utils/redisClient';
import { COINGECKO_API_URL } from '@/utils/config';
import { transformGraphData } from '@/utils/common';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { ids, vs_currency } = req.query;

        const redisKey = `coinlist-${ids}-${vs_currency}`;
        let response;
        let redisData = await redisClient.get(redisKey);
        if (!redisData) {
            const result = await axios.get(`${COINGECKO_API_URL}/coins/markets?vs_currency=${vs_currency}&ids=${ids}&order=market_cap_desc&price_change_percentage=24h,7d&precision=2`);
            const list = [];
            if (result.data?.length) {
                for (let item of result.data) {
                    const days = '30';
                    const redisKey = `chart-${item.id}-${vs_currency}-${days}-daily`;
                    let redisData = await redisClient.get(redisKey);
                    if (!redisData) {
                        const chart = await axios.get(`${COINGECKO_API_URL}/coins/${item.id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`);
                        const graphData = transformGraphData(chart.data.prices);
                        Object.assign(item, {
                            "30daygraph": graphData
                        })

                        let cache_ttl = 30;
                        if (days) {
                            if (parseInt(days) >= 2 || parseInt(days) <= 90) {
                                cache_ttl = 1800
                            }
                            if (parseInt(days) > 90) {
                                cache_ttl = 43200
                            }
                        }

                        // Cache / Update Frequency: every 30, 1800, 43200 sec
                        await redisClient.set(redisKey, JSON.stringify(chart.data), 'EX', cache_ttl);
                    } else {
                        const chart = JSON.parse(redisData);
                        const graphData = transformGraphData(chart.prices);
                        Object.assign(item, {
                            "30daygraph": graphData
                        })
                    }
                    list.push(item);
                }
            }

            // Cache / Update Frequency: every 45 sec
            await redisClient.set(redisKey, JSON.stringify(list), 'EX', 45);
            response = list;
        } else {
            response = JSON.parse(redisData);
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data : coinlist' });
    }
}