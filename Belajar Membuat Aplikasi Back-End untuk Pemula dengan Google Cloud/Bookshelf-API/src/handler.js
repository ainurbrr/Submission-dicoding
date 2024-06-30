const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(10);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    var finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt };

    if (name !== "" && name !== undefined && readPage <= pageCount) {
        books.push(newBook);
        const isSuccess = books.filter((book) => book.id === id).length > 0;
        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });
            response.code(201);
            return response;
        }
    } else if (name === "" || name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {

    const { reading, finished, name } = request.query;

    if (books.length === 0) {
        const response = h.response({
            status: 'success',
            data: {
                books: [],
            },
        });
        response.code(200);
        return response;
    } else if (reading !== undefined) {
        if (reading === 1) {
            const readingBooks = books.filter((b) => b.reading === true);
            const listBooks = readingBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }));
            const response = h.response({
                status: 'success',
                data: {
                    books: listBooks,
                },
            });
            response.code(200);
            return response;
        }
        const unreadingBooks = books.filter((b) => b.reading === false);
        const listBooks = unreadingBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: 'success',
            data: {
                books: listBooks,
            },
        });
        response.code(200);
        return response;
    } else if (finished !== undefined) {
        if (finished == 1) {
            const finishedBooks = books.filter((b) => b.finished === true);
            const listBooks = finishedBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }));
            const response = h.response({
                status: 'success',
                data: {
                    books: listBooks,
                },
            });
            response.code(200);
            return response;
        }
        const unfinishedBooks = books.filter((b) => b.finished === false);
        const listBooks = unfinishedBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: 'success',
            data: {
                books: listBooks,
            },
        });
        response.code(200);
        return response;
    } else if (name !== undefined) {
        const contains = books.filter(b => b.name.includes(name) || b.publisher.includes(name));
        const listBooks = contains.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: 'success',
            data: {
                books: listBooks,
            },
        });
        response.code(200);
        return response;
    }

    const listBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    const response = h.response({
        status: 'success',
        data: {
            books: listBooks,
        },
    });

    response.code(200);
    return response;
};


const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;;
}

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1 && name !== "" && name !== undefined && readPage <= pageCount) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else if (name === "" || name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);
    return response;

}

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };