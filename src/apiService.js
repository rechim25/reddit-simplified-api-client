import axios from 'axios';

const url = 'http://localhost:5000/api';

export const fetchTopPostsFromSubreddit = (subreddit, timeframe, limit) => {
    return axios.get(`${url}/subreddit/${subreddit}?timeframe=${timeframe}&limit=${limit}`);
}