module.exports = function(app) {
    app.get('/api/person/:id', function(req, res) {
        // get that data from db
        // res.json({ firstname: 'John', lastname: 'Doe' });
    });

    app.post('/api/person', jsonParser, function(req, res) {
        //save to db
    });

    app.delete('api/person/:id', function(req, res) {
        // delete from db
    });
}
