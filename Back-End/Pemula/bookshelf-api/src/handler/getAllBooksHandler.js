const books = require('../data/books');

const getAllBooksHandler = (request, h) => {
    const newBooks = [];

    books.forEach(book => {
        newBooks.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        });
    });

    const { name, reading, finished } = request.query;

    if (name) {
        if (name.toLowerCase() === 'dicoding') {
            const response = h.response({
                status: 'success',
                data: {
                    books: newBooks.filter(book => {
                        if (book.name.toLowerCase().includes('dicoding')) {
                            return book;
                        }
                    })
                }
            });
            response.code(200);
            return response;
        }
    }

    const booksReading = books.filter(book => book.reading == reading);
    const newBooksReading = [];

    booksReading.forEach(book => {
        newBooksReading.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        });
    });

    if (newBooksReading.length > 0) {
        const response = h.response({
            status: 'success',
            data: {
                books: newBooksReading
            }
        });
        response.code(200);
        return response;
    }

    const booksFinished = books.filter(book => book.finished == finished);
    const newBooksFinished = [];

    booksFinished.forEach(book => {
        newBooksFinished.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        });
    });

    if (newBooksFinished.length > 0) {
        const response = h.response({
            status: 'success',
            data: {
                books: newBooksFinished
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: newBooks
        }
    });
    response.code(200);
    return response;
};

module.exports = getAllBooksHandler;
