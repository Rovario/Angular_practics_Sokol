import { Component } from '@angular/core';
import { RegistrationFormComponent } from './components/registration-form/registration-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistrationFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-forms-practical';
}