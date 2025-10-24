import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { TitleCasePipe } from '../../pipes/title-case-pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, TitleCasePipe],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsComponent implements OnInit {
  
  // Поточна книга
  book: Book | undefined;
  
  // Прапорець завантаження
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Отримання ID з параметрів маршруту
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      this.loadBookDetails(id);
    } else {
      this.router.navigate(['/list']);
    }
  }

  // Завантаження деталей книги
  loadBookDetails(id: number): void {
    this.book = this.bookService.getBookById(id);
    this.loading = false;

    // Якщо книгу не знайдено, перенаправлення на список
    if (!this.book) {
      this.router.navigate(['/list']);
    }
  }

  // Навігація назад до списку
  goBack(): void {
    this.router.navigate(['/list']);
  }

  // Отримання статусу ціни
  getPriceStatus(): string {
    if (!this.book) return '';
    return this.book.price > 500 ? 'Дорога' : 'Доступна';
  }

  // Отримання класу ціни
  getPriceClass(): string {
    if (!this.book) return '';
    return this.book.price > 500 ? 'expensive' : 'affordable';
  }
}