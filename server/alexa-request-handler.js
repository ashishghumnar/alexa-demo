/**
 * Created by aghumnar on 9/28/2017.
 */
const socket_io = require('socket.io'),
    smart_facilities = require('./api/smart-facilities-routes'),
    news_skill_routes = require('./api/news-skill-routes');

function alexaRequestHandler(app, server) {
    socket_io(server)
        .on('connection', function (socket) {
            smart_facilities.setSocket(socket);
        });

    app.post('/api.echo', smart_facilities);
    app.post('/api.echo/news', news_skill_routes);
}

module.exports = alexaRequestHandler;