const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler({ payload }, h) {
        try {
            this._validator.validateSongPayload(payload);

            const songId = await this._service.addSong(payload);

            const response = h.response({
                status: 'success',
                data: {
                    songId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongsHandler({ query }, h) {
        const songs = await this._service.getSongs(query);

        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    async getSongByIdHandler({ params }, h) {
        try {
            const { id } = params;
            const song = await this._service.getSongById(id);

            return {
                status: 'success',
                data: {
                    song,
                },
            };
        } catch (error) {
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putSongByIdHandler({ payload, params }, h) {
        try {
            this._validator.validateSongPayload(payload);
            const { id } = params;
            await this._service.editSongById(id, payload);

            return {
                status: 'success',
                message: 'Song berhasil diedit',
            };
        } catch (error) {
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongByIdHandler({ params }, h) {
        try {
            const { id } = params;
            await this._service.deleteSongById(id);
            return {
                status: 'success',
                message: 'Song berhasil dihapus',
            };
        } catch (error) {
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = SongsHandler;
