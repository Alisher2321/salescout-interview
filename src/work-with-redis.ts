import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    // Connect to Redis
    const client = createClient();

    client.on('error', (err) => {
        console.log('Redis Client Error:', err);
    });

    await client.connect();

    // Save keys with their values
    await client.set('name', 'Alice');
    await client.set('age', '30');
    await client.set('city', 'New York');

    console.log('Keys have been saved to Redis.');

    // Read and output values for a given key
    const keyToRead = 'name'; // Example: Change this to any key you want to query
    const value = await client.get(keyToRead);
    
    if (value) {
        console.log(`The value for key "${keyToRead}" is: ${value}`);
    } else {
        console.log(`No value found for key "${keyToRead}"`);
    }

    // Close the Redis client
    await client.quit();
}

module.exports = { manageRedis };



npm install redis
