/**
 * Created by aghumnar on 10/1/2017.
 */
const https = require('https');

var intent_responce = require('../intent-response-constant');

function getNews(req, res) {
    var options = {
        url: 'https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=81c60706fcf9403c98adf6fdee1ae8c6'
    };
    var body = '';

    if (req.headers.signaturecertchainurl && req.headers.signature) {
        https.get(options.url, function (newsResponce) {
            newsResponce.on('data', function (d) {
                body += d;
            });

            newsResponce.on('end', function () {
                try {
                    intent_responce.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = filterResponse(JSON.parse(body));
                    res.send(intent_responce.SIMPLE_JSON_RESPONSE);
                } catch (err) {
                    console.log(err);
                }
            });

        }).on('error', function (e) {
        });
    }
}

function filterResponse(res) {
    var newsString = 'Here is your flash briefing from The Hindu, ';

    res.articles.forEach(function (news) {
        if (newsString.length < 8000) {
            newsString = newsString + news.title + news.description + '.';
        } else {
            return;
        }
    });

    return newsString;
}


module.exports = getNews;