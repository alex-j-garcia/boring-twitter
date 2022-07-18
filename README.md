# boring-twitter

## How-to

After installing dependencies, get a bearer token from [Twitter's Developer Portal](https://developer.twitter.com/).

Create an `app-env` file locally (do not commit this file) and paste your bearer token, like so:

```
export BEARER_TOKEN=<your_bearer_token_here>
```

Then, change line 4 of `index.js`:

```
const users = [/* Add @s here */];
```

Save and run `npx nodemon server.js` in your terminal. By adding strings of Twitter handles to this array...

```
const users = [
  'cnn', 'BBCBreaking', 'nytimes',
  'washingtonpost', 'potus'
];
```

...you'll get a feed that looks like:

| Boring Twitter |
---
| cnn$ The Blue Angels, the US Navy's elite flight demonstration squadron, has selected the first female fighter jet demonstration pilot for their upcoming season
| BBCBreaking$ Tom Tugendhat out of race to be Conservative leader and next UK prime minister after latest vote |
|nytimes$ The changing of the guard ceremony at Buckingham Palace on Monday was shortened because of the heat wave hitting Britain, a spokesman for the British Army said.|
