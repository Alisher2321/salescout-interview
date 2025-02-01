import axios from 'axios';

type APIResponseType = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

async function fetchLongPosts(): Promise<APIResponseType[]> {
    try {
        // Make a GET request to the JSONPlaceholder API
        const response = await axios.get<APIResponseType[]>('https://jsonplaceholder.typicode.com/posts');
        
        // Filter posts with a body longer than 100 characters
        const longPosts = response.data.filter(post => post.body.length > 100);

        return longPosts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return an empty array if there's an error
    }
}

module.exports = { fetchLongPosts };
