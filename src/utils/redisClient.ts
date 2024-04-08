import Redis, { RedisOptions } from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './config';

// Define the Redis server connection options
const options: RedisOptions = {
    host: REDIS_HOST, // Redis server is running on localhost
    port: parseInt(REDIS_PORT), // Default Redis port
    // password: 'your_redis_password',
};

const redisClient = new Redis(options);

export default redisClient;