const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler({ payload }, h) {
        try {
            this._validator.validateAlbumPayload(payload);
            const albumId = await this._service.addAlbum(payload);

            const response = h.response({
                status: 'success',
                data: {
                    albumId,
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

    async getAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id);
            const songs = await this._service.getSongsByAlbumId(id);

            return {
                status: 'success',
                data: {
                    album: {
                        ...album,
                        songs,
                    },
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

    async putAlbumByIdHandler({ payload, params }, h) {
        try {
            this._validator.validateAlbumPayload(payload);
            const { id } = params;
            await this._service.editAlbumById(id, payload);

            return {
                status: 'success',
                message: 'Album berhasil diedit',
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

    async deleteAlbumByIdHandler({ params }, h) {
        try {
            const { id } = params;
            await this._service.deleteAlbumById(id);
            return {
                status: 'success',
                message: 'Album berhasil dihapus',
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

module.exports = AlbumsHandler;
