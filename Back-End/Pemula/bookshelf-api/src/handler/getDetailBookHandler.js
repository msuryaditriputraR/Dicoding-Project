const books = require('../data/books');

const getDetailBookHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter(b => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = getDetailBookHandler;
