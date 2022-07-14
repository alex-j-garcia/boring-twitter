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
    'cnn',
  ];

  React.useEffect(() => {
    fetch(`/search?users=${users.join(',')}`)
      .then(res => res.json())
      .then(data => setTweets(data))
      .catch(error => console.log('Error: ', error))
  }, []);

  const elements = tweets.map(tweet => <Tweet key={uuidv4()} tweet={tweet}/>);

  return (
    <div className='app'>
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
    <div className='tweet'>
      <p>
        <span className='author'>{author}$ </span>
        {topTweet.text}
        <span className='engagement'>{topTweet.totalEngagement}</span>
      </p>
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);