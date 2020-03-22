var request = require("request");
const key = '7oqzwpewVVrx+xZcY/7Opzmg68VBxqp5++Pj/NoP';
const lineReplace = require('line-replace');
const deletefirstLines = require('firstline_delete');
const countLinesInFile = require('count-lines-in-file');
const firstline = require('firstline');
const fs = require('fs');
function apiRequest(key, reqText, lang, res) {
  try {
    firstline('public/key', { lineEnding: '\r\n' })
      .then((key) => {
        if (key == 'Poor') {
          var jsonString = `{\"messages\": [{\"text\":\"Key het roi, huhu\"}]}`;
          var jsonObj = JSON.parse(jsonString);
          res.send(jsonObj);
          fs.writeFile('public/key', 'Poor', function (err) {
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
            deletefirstLines('public/key');
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
    app.route('/request')
      .post(function (req, res) {
        console.log('post');
      });
    app.route('/contribute')
      .post(function (req, res) {
        var data = req.body;
        countLinesInFile('public/key', (Error, number) => {
          lineReplace({
            file: 'public/key',
            line: number + 1,
            text: data.key,
            addNewLine: true,
            callback: ({ file, line, text, replacedText }) => {
              fs.appendFile('public/key', 'Poor', function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              fs.appendFile('public/contribute', `Name : ${data.name} | Email : ${data.email} | Key : ${data.key} \n`, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            }

          })
        });

        res.send('ok')
      });


  }
}