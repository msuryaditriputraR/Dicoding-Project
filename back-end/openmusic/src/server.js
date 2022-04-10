require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/albumsService');
const SongsService = require('./services/postgres/songsService');
const MusicValidator = require('./validator/music');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: albums,
        options: {
            service: new AlbumsService(),
            validator: MusicValidator,
        },
    });

    await server.register({
        plugin: songs,
        options: {
            service: new SongsService(),
            validator: MusicValidator,
        },
    });

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
        if (response instanceof ClientError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
    }

    return response.continue || response;
});


    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

module.exports = init;
