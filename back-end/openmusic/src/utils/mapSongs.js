const mapSongs = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
    created_at,
    updated_at,
}) => {
    if (!year || !genre) {
        return {
            id,
            title,
            performer,
        };
    }

    return {
        id,
        title,
        year,
        genre,
        performer,
        duration,
        albumId: album_id,
        createdAt: created_at,
        updatedAt: updated_at,
    };
};

module.exports = mapSongs;
