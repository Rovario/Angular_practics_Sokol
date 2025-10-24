import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { HighlightDirective } from '../../directives/highlight';
import { TitleCasePipe } from '../../pipes/title-case-pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule,
    HighlightDirective, 
    TitleCasePipe
  ],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent implements OnInit {
  
  // Список всіх книг
  books: Book[] = [];
  
  // Фільтр для пошуку
  searchText: string = '';
  
  // Сортування
  sortBy: 'title' | 'price' | 'date' = 'title';
  sortAscending: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Завантаження даних при ініціалізації компонента
    this.loadBooks();
  }

  // Завантаження списку книг з сервісу
  loadBooks(): void {
    this.books = this.bookService.getAllBooks();
  }

  // Отримання відфільтрованих та відсортованих книг
  get filteredBooks(): Book[] {
    let result = [...this.books];

    // Фільтрація за назвою або автором
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(search) || 
        book.author.toLowerCase().includes(search)
      );
    }

    // Сортування
    result.sort((a, b) => {
      let comparison = 0;
      
      switch(this.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'date':
          comparison = a.publishedDate.getTime() - b.publishedDate.getTime();
          break;
      }
      
      return this.sortAscending ? comparison : -comparison;
    });

    return result;
  }

  // Зміна напрямку сортування
  toggleSort(field: 'title' | 'price' | 'date'): void {
    if (this.sortBy === field) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortBy = field;
      this.sortAscending = true;
    }
  }

  // Очищення фільтра
  clearSearch(): void {
    this.searchText = '';
  }
}