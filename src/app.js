import Twitter     from 'twitter';
import request     from 'request';
import * as config from './config';

const client = new Twitter({
    consumer_key       : config.consumer_key,
    consumer_secret    : config.consumer_secret,
    access_token_key   : config.access_token_key,
    access_token_secret: config.access_token_secret
});

const stream = client.stream('statuses/filter', { track: '#GalaUTT2017' });

stream.on('data', function(event) {
    request.post({
        url    : `${config.api}/sms`,
        headers: { 'content-type': 'application/json' },
        body   : JSON.stringify({
            message: event.text,
            from   : event.user.screen_name
        })
    });
});

stream.on('error', function(error) {
    throw error;
});
