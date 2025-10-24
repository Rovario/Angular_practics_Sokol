import { Pipe, PipeTransform } from '@angular/core';

/**
 * Пайп для перетворення тексту у Title Case
 * Приклад: "angular fundamentals" -> "Angular Fundamentals"
 */
@Pipe({
  name: 'titleCase',
  standalone: true
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Розбиваємо текст на слова та перетворюємо кожне слово
    return value
      .toLowerCase()
      .split(' ')
      .map(word => {
        // Перша літера - велика, решта - малі
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}