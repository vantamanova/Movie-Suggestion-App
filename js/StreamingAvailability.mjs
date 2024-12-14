export async function getStreamingAvailability(imdbId, country = 'us') {
    const url = `https://streaming-availability.p.rapidapi.com/shows/${imdbId}?series_granularity=show&output_language=en&country=ae`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b4bb9120c8mshb5551a1d6e1374bp132fa3jsna50c6c59ef49',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
