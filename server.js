var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();
var stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
    console.log('Otrzymałem żądanie GET do strony głównej');
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        stringifyFile = data;
        res.send(data)
    });
});

app.post('/updateNote/:note', function (req, res) {
    stringifyFile += req.params.note;
    fs.writeFile('./test.json', stringifyFile, function (err) {
        if (err) throw err;
        console.log('File updated');
        res.send(stringifyFile);
    });
});

app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});