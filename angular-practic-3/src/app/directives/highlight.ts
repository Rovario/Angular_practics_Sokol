import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Директива для підсвічування елементів
 * Якщо ціна книги більше 500 грн, фон стає жовтим
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  
  // Вхідний параметр - ціна книги
  @Input() appHighlight: number = 0;
  
  // Поріг ціни для підсвічування
  @Input() priceThreshold: number = 500;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Перевірка, чи ціна перевищує поріг
    if (this.appHighlight > this.priceThreshold) {
      // Додаємо жовтий фон та рамку
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff3cd');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ffc107');
      this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    }
  }
}