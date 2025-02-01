type RequestsResult = {
    data: any,
    status: number
};

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    // Map over the URLs and create a fetch promise for each one
    const fetchPromises = urls.map(async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            return { data: null, status: 500 }; // Handle errors gracefully
        }
    });

    // Use Promise.allSettled to get results in the order the queries complete
    const results = await Promise.all(fetchPromises);

    return results;
}

module.exports = { fetchAll };
