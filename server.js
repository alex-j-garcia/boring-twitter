const axios = require('axios');
const http = require('http');
const fs = require('fs');
const { DateTime } = require("luxon");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const html = fs.readFileSync('index.html');
  const script = fs.readFileSync('index.js');

  if (req.url == '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } else if (req.url == '/index.js') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(script);
  } else if (req.url.includes('/search?users=')) {
    return getTwitterPayload(req.url)
      .then((twitterPayload) => getDailyTweets(twitterPayload))
      .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(resp));
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 - Page not found</h1>');
  }
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

const getUtcDate = () => {
  const date = DateTime.now().setZone('America/New_York').startOf('day');
  return date.toString();
};

const getTwitterPayload = (query) => {
  const userString = query.substring(query.indexOf('=') + 1);
  const usersArray = userString.split(',');

  const data = usersArray.map(
    user => {
      return getAllTweets(
        'https://api.twitter.com/2/tweets/search/recent?expansions=author_id&query='
          + `from:${user} -is:retweet -is:reply&start_time=${getUtcDate()}`
          + '&tweet.fields=public_metrics'
      )
        .then(response => ({ author: user, tweets: response }));
  });

  return Promise.all(data);
};

const sendRequest = url => {
  return axios({
    url,
    method: 'get',
    headers: {'Authorization': `Bearer ${process.env.BEARER_TOKEN}`},
  })
    .then(response => response.data)
    .catch(error => console.log('Error:', error.response));
};

const getAllTweets = async url => {
  let nextToken = null;
  let tweets = [];

  do {
    const response = await sendRequest(
      nextToken ? url + `&next_token=${nextToken}` : url
    );
    const { data, meta } = response;
    tweets = data && [ ...tweets, ...data ];
    nextToken = meta.next_token;
  } while (nextToken)

  return tweets;
};

const getDailyTweets = payload => {
  const activeUsers = removeNonTweets(payload);
  return activeUsers.map(({ author, tweets }) => {
    const engagedTweets = calcEngagement(tweets);
    return { author, topTweet: getTopTweet(engagedTweets) }
  });
};

const removeNonTweets = allData => allData.filter((user) => user.tweets);

const calcEngagement = tweets => {
  return tweets.map(({ text, public_metrics }) => {
    const { like_count, retweet_count } = public_metrics;
    return { text, totalEngagement: like_count + retweet_count };
  });
};

const getTopTweet = engagedTweets => {
    return engagedTweets.reduce((prevTweet, currentTweet) => (
      prevTweet.totalEngagement > currentTweet.totalEngagement ?
        prevTweet : currentTweet
    ));
};
