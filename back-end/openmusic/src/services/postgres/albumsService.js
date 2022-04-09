const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const { mapAlbums } = require('../../utils');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class albumsService {
    constructor() {
        this._pool = new Pool();
        this._table = 'albums';
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO $1 VALUES($2, $3, $4, $5, $6) RETURNING id',
            values: [this._table, id, name, year, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbums() {
        const query = {
            text: 'SELECT * FROM $1',
            values: [this._table],
        };

        const result = await this._pool.query(query);
        return result.rows.map(mapAlbums);
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT * FROM $1 WHERE id = $2',
            values: [this._table, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }

        return result.rows.map(mapAlbums)[0];
    }

    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE $1 SET name = $2, year = $3, updated_at = $4 WHERE id = $5 RETURNING id',
            values: [this._table, name, year, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(
                'Gagal memperbarui album. Id tidak ditemukan'
            );
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM $1 WHERE id = $2 RETURNING id',
            values: [this._table, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = albumsService;
