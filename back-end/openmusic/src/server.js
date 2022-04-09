require('dotenv').config();

const Hapi = require('@hapi/hapi');
const AlbumsService = require('./services/postgres/albumsService');
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
            service: AlbumsService,
            validator: MusicValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

module.exports = init;
