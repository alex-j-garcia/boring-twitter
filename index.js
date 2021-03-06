function App() {
  const [tweets, setTweets] = React.useState([]);
  const [noTweets, setNoTweets] = React.useState(false);
  const users = [/* Add @s here */];

  React.useEffect(() => {
    fetch(`/search?users=${users.join(',')}`)
      .then(res => res.json())
      .then(data => {
        if (data.length) setTweets(data)
        else setNoTweets(true)
      })
      .catch(error => console.log('Error: ', error))
  }, []);

  return (
    <div className='app'>
      <Header />
      {tweets.length || noTweets ?
        <Feed tweets={tweets} /> :
        <LoadingSpinner />
      }
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <div className='heading'>
        <h1>Boring Twitter</h1>
        <RefreshButton />
      </div>
      <p>
        No images, no videos, no retweets, no replies.
        Just the most engaged daily tweet.
      </p>
    </div>
  );
}

function RefreshButton() {
  React.useEffect(() => {
    const refreshBtn = document.querySelector('.refresh');
    const reload = () => window.location.reload();
    refreshBtn.addEventListener('click', reload);
    return () => refreshBtn.removeEventListener('click', reload);
  }, []);

  return (
    <button className='refresh'>
      Refresh 🔄
    </button>
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

function Feed({ tweets }) {
  const elements = tweets.map(tweet => {
    const { id } = tweet.topTweet;
    return (
      <Tweet
        key={id}
        id={id}
        tweet={tweet}
      />
    );
  });

  return (
    <ul>
      {elements.length ? elements : "No new tweets"}
    </ul>
  );
}

function Tweet(props) {
  const { author, topTweet } = props.tweet;
  return (
    <li className='tweet'>
      <p className='text'>
        <span className='author'>{author}$ </span>
        {topTweet.text}
      </p>
      <p className='engagement'>
        ❤️ + 🔁 = {topTweet.totalEngagement}
      </p>
    </li>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);