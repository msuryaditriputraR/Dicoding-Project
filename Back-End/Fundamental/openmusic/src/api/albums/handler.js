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
    }

    async getAlbumByIdHandler({ params }) {
        const { id } = params;
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
    }

    async putAlbumByIdHandler({ payload, params }) {
        this._validator.validateAlbumPayload(payload);
        const { id } = params;
        await this._service.editAlbumById(id, payload);

        return {
            status: 'success',
            message: 'Album berhasil diedit',
        };
    }

    async deleteAlbumByIdHandler({ params }) {
        const { id } = params;
        await this._service.deleteAlbumById(id);
        return {
            status: 'success',
            message: 'Album berhasil dihapus',
        };
    }
}

module.exports = AlbumsHandler;
