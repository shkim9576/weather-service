var request = require('request');
var BASE_URL = 'https://api.darksky.net/forecast/';
var API_KEY = 'your-api-key/';

exports.query = function (req, res) {
    var url = BASE_URL + API_KEY + req.query.query;
    console.log(url);

    request(url, function (error, response, body) {
        var obj = JSON.parse(body);
        var result = {"summary":obj.currently.summary,
            "temperature":obj.currently.temperature,
            "time":obj.currently.time
        };

        res.send(result);
    });
}
