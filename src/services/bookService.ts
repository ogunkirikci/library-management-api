import Book from '../models/Book';

export class BookService {
  async getAllBooks() {
    return await Book.findAll();
  }

  async getBookById(id: number) {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Book not found');
    return book;
  }

  async createBook(data: { name: string }) {
    const existingBook = await Book.findOne({
      where: {
        name: data.name
      }
    });

    if (existingBook) {
      throw new Error('A book with this name already exists');
    }

    return await Book.create(data);
  }
}