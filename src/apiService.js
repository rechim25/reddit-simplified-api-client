import axios from "axios";

const url = "api";

export const fetchTopPostsFromSubreddit = (subreddit, timeframe, limit) => {
  return axios.get(
    `${url}/subreddit/${subreddit}?timeframe=${timeframe}&limit=${limit}`
  );
};
