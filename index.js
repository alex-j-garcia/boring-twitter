function App() {
  const [tweets, setTweets] = React.useState([]);
  const users = [
    'emeriticus', 'notaxation', 'naval',
    'mpjme', 'unusual_whales', 'dsptch',
    'NavalismHQ', 'cnn', 'martyrmade',
    'codylindley', 'highway_30',
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
      <Header />
      {tweets.length ?
        elements :
        <h1>Hello, React World!</h1>
      }
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <h1>Boring Twitter</h1>
      <p>No images, no videos, no retweets, no replies.</p>
    </div>
  );
}

function Tweet(props) {
  const { author, topTweet } = props.tweet;

  return (
    <div className='tweet'>
      <p className='text'>
        <span className='author'>{author}$ </span>
        {topTweet.text}
      </p>
      <p className='engagement'>
        ❤️ + 🔁 = {topTweet.totalEngagement}
      </p>
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);