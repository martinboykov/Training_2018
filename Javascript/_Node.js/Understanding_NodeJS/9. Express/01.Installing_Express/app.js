const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    let dataStream = [];
    fs.createReadStream(__dirname + '/index.html', 'utf8')
        .on('data', (chunk) => {
            dataStream.push(chunk);
        }).on('end', () => {
            res.send(dataStream[0].toString().replace('{Message}', 'Hello'));
        });
});
app.get('/api', function(req, res) {
    const obj = {
        firstname: 'John',
        secondname: 'Doe',
    };
    res.json(obj);
});

app.listen(port);
