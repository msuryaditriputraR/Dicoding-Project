const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const { mapSongs } = require('../../utils');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [
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

    async getSongs({ title = '', performer = '' }) {
        const query = {
            text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
            values: [`%${title}%`, `%${performer}%`],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song tidak ditemukan');
        }

        return result.rows.map(mapSongs)[0];
    }

    async editSongById(
        id,
        { title, year, genre, performer, duration, albumId }
    ) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [
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
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = SongsService;
