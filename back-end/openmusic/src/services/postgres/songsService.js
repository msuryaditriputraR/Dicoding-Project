const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const { mapSongs } = require('../../utils');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class SongsService {
    constructor() {
        this._pool = new Pool();
        this._table = 'songs';
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO $1 VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
            values: [
                this._table,
                id,
                title,
                year,
                genre,
                performer,
                duration,
                albumId,
                createdAt,
                updatedAt,
            ],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Song gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs() {
        const query = {
            text: 'SELECT id, title, performer FROM $1',
            values: [this._table],
        };

        const result = await this._pool.query(query);
        return result.rows.map(mapSongs);
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM $1 WHERE id = $2',
            values: [this._table, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song tidak ditemukan');
        }

        return result.rows.map(mapAlbums)[0];
    }

    async editSongById(
        id,
        { title, year, genre, performer, duration, albumId }
    ) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE $1 SET title = $2, year = $3, genre = $4, performer = $5, duration = $6, album_id = $7, updated_at = $8 WHERE id = $9 RETURNING id',
            values: [
                this._table,
                title,
                year,
                genre,
                performer,
                duration,
                albumId,
                updatedAt,
                id,
            ],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(
                'Gagal memperbarui song. Id tidak ditemukan'
            );
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM $1 WHERE id = $2 RETURNING id',
            values: [this._table, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = SongsService;
