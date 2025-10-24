import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.html',
  styleUrls: ['./data-list.scss']
})
export class DataListComponent implements OnInit {
  data: any[] = [];
  loading = true;
  error = '';

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'Помилка завантаження даних';
        this.loading = false;
      }
    });
  }

  trackByTitle(index: number, item: any): string {
    return item.title;
  }
}

