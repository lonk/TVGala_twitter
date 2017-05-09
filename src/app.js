import Twitter     from 'twitter';
import * as config from './config';

const client = new Twitter({
    consumer_key       : config.consumer_key,
    consumer_secret    : config.consumer_secret,
    access_token_key   : config.access_token_key,
    access_token_secret: config.access_token_secret
});

const stream = client.stream('statuses/filter', { track: 'galautt' });

stream.on('data', function(event) {
    console.log(event && event.text);
});

stream.on('error', function(error) {
    throw error;
});
