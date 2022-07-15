function App() {
  const [tweets, setTweets] = React.useState([]);
  const users = [/* list of users here */];

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
        <LoadingSpinner />
      }
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <h1>Boring Twitter</h1>
      <p>
        No images, no videos, no retweets, no replies.
        Just the most engaged daily tweet.
      </p>
    </div>
  );
}

function LoadingSpinner() {
  React.useEffect(() => {
    const loading = document.querySelector('.loading');
    const intervalID = (() => {
      let rotation = 90;
      return setInterval(() => {
        loading.style.transform = `rotate(${rotation}deg)`;
        if (rotation == 360) rotation = 0
        else rotation += 90;
      }, 300);
    })();

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className='loading'></div>
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