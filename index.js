function App() {
  const [tweets, setTweets] = React.useState([]);
  const users = [
    'emeriticus',
    'notaxation',
    'naval',
    'mpjme',
    'unusual_whales',
    'dsptch',
    'NavalismHQ',
  ];

  React.useEffect(() => {
    fetch(`/search?users=${users.join(',')}`)
      .then(res => res.json())
      .then(data => setTweets(data))
      .catch(error => console.log('Error: ', error))
  }, []);

  const elements = tweets.map(tweet => <Tweet tweet={tweet}/>);

  return (
    <div class='app'>
      {tweets.length ?
        elements :
        <h1>Hello, React World!</h1>
      }
    </div>
  );
}

function Header() {
  return (
    <h1>Boring Twitter</h1>
  );
}

function Tweet(props) {
  const { author, topTweet } = props.tweet;

  return (
    <div key={uuidv4()} class='tweet'>
      <p>
        <span class='author'>{author}$ </span>
        {topTweet.text}
        <span class='engagement'>{topTweet.totalEngagement}</span>
      </p>
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);