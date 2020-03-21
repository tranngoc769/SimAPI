var request = require("request");
const key = '7oqzwpewVVrx+xZcY/7Opzmg68VBxqp5++Pj/NoP';

const deletefirstLines = require('firstline_delete');
const firstline = require('firstline');
const fs = require('fs');
function apiRequest(key, reqText, lang, res) {
  try {
    firstline('./key', { lineEnding: '\n' })
      .then((key) => {
        if (key == 'Poor') {
          var jsonString = `{\"messages\": [{\"text\":\"Key het roi, huhu\"}]}`;
          var jsonObj = JSON.parse(jsonString);
          res.send(jsonObj);
          fs.writeFile('./key', 'Poor', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          return;
        }
        var options = {
          method: 'POST',
          url: 'https://wsapi.simsimi.com/190410/talk/',
          headers:
          {
            'x-api-key': key,
            'Content-Type': 'application/json'
          },
          body: { utext: reqText, lang: `${lang}`, atext_bad_prob_max: 0.3 },
          json: true
        };
        const r = request(options, function (error, response, body) {
          if (error) throw new Error(error);
          if (body.message == 'Limit Exceeded Exception' || body.message == 'Forbidden') {
            deletefirstLines('./key');
            apiRequest(key, reqText, lang, res);
          }
          else {
            var jsonString = `{\"messages\": [{\"text\":\"${body.atext}\"}]}`;
            var jsonObj = JSON.parse(jsonString);
            res.send(jsonObj);
          }
        });

        console.log(r.headers);
      }
      );

  }
  catch (err) {
    var jsonString = `{\"messages\": [{\"text\":\"Loi roi, huhu\"}]}`;
    var jsonObj = JSON.parse(jsonString);
    res.send(jsonObj);
  }
}

module.exports =
{
  router(app) {
    app.route('/api/text=:text&lan=:lan')
      .get(function (req, res) {
        var reqText = req.params['text'];
        var lang = req.params['lan'];
        apiRequest(key, reqText, lang, res)
      });

    app.route('/')
      .get(function (req, res) {
        res.render('index');
      });

    app.route('')
      .get(function (req, res) {
        res.send('Server started')
      });


    app.route('/api/text=:text')
      .get(function (req, res) {
        var reqText = req.params['text'];
        var lang = 'vi';
        apiRequest(key, reqText, lang, res)
      });


  }
}