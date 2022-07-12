function App() {
  const [tweets, setTweets] = React.useState([]);
  const users = [
    'emeriticus',
    'notaxation',
    'naval',
    'mpjme',
    'unusual_whales',
    'dsptch'
  ];

  React.useEffect(() => {
    fetch(`/search?users=${users.join(',')}`)
      .then(res => res.json())
      .then(data => setTweets(data))
      .catch(error => console.log('Error: ', error))
  }, []);

  const elements = tweets.map(({ author, topTweet }) => (
    <p key={uuidv4()}>
      <i>{author}</i>$ {topTweet.text}
      <b>{topTweet.totalEngagement}</b>
    </p>
  ));

  return (
    <div>
      {tweets.length ?
        elements :
        <h1>Hello, React World!</h1>
      }
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);