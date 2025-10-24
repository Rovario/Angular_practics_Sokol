import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  // Список книг (імітація даних з backend)
  private books: Book[] = [
    {
      id: 1,
      title: 'angular fundamentals',
      author: 'John Smith',
      price: 650,
      publishedDate: new Date('2023-05-15'),
      description: 'Повний посібник з основ Angular'
    },
    {
      id: 2,
      title: 'typescript mastery',
      author: 'Jane Doe',
      price: 450,
      publishedDate: new Date('2023-08-20'),
      description: 'Майстерність володіння TypeScript'
    },
    {
      id: 3,
      title: 'rxjs in action',
      author: 'Mike Johnson',
      price: 720,
      publishedDate: new Date('2022-11-10'),
      description: 'Реактивне програмування з RxJS'
    },
    {
      id: 4,
      title: 'web development pro',
      author: 'Sarah Williams',
      price: 380,
      publishedDate: new Date('2024-01-05'),
      description: 'Професійна веб-розробка'
    },
    {
      id: 5,
      title: 'clean code principles',
      author: 'Robert Martin',
      price: 550,
      publishedDate: new Date('2023-03-12'),
      description: 'Принципи чистого коду'
    }
  ];

  constructor() { }

  // Отримати всі книги
  getAllBooks(): Book[] {
    return this.books;
  }

  // Отримати книгу за ID
  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  // Додати нову книгу
  addBook(book: Book): void {
    this.books.push(book);
  }
}