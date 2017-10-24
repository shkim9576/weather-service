module.exports = function (app) {
    var query = require('../controllers/query.server.controller');
    app.get('/query', query.query);
};