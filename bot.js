var fs = require('fs');

var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

// T.get('search/tweets', {
//  q: 'banana since:2011-07-11',
//  count: 100
// }, function(err, data, response) {
//  var tweets = data.statuses;
//  for (i = 0; i < tweets.length; i++) {
//    console.log(tweets[i].user.screen_name + '\n');
//  }
// })

var pics = [
  'fallon0.png',
  'fallon1.jpg',
  'fallon2.gif',
  'fallon3.jpg',
  'fallon4.jpg',
  'fallon5.gif',
  'fallon6.gif',
  'fallon7.gif',
  'fallon8.gif',
  'fallon9.jpg',
];

var stream = T.stream('statuses/filter', {track: '@jimmyfallon'});

stream.on('tweet', function(tweet) {

  var user = tweet.user.screen_name;

  var i = Math.floor(Math.random() * (pics.length + 1));

  var b64content = fs.readFileSync(pics[i], { encoding: 'base64' });

// first we must post the media to Twitter
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string;
  var meta_params = { media_id: mediaIdStr};

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: '@' + user, media_ids: [mediaIdStr] };

      T.post('statuses/update', params, function (err, data, response) {
        
      });
  }
});
});
});