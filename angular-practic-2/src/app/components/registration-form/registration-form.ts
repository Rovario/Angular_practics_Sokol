import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css'
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  submitted = false;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.passwordStrength()
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      birthDate: ['', [
        Validators.required,
        CustomValidators.minimumAge(14)
      ]]
    }, {
      validators: CustomValidators.passwordMatch('password', 'confirmPassword')
    });
  }

  // Геттери для зручного доступу до полів форми
  get f() {
    return this.registrationForm.controls;
  }

  // Перевірка, чи поле було торкнуте або форма була відправлена
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  // Отримання помилок для конкретного поля
  getFieldErrors(fieldName: string): string[] {
    const field = this.registrationForm.get(fieldName);
    const errors: string[] = [];

    if (!field || !field.errors || (!field.dirty && !field.touched && !this.submitted)) {
      return errors;
    }

    if (field.errors['required']) {
      errors.push('Це поле обов\'язкове');
    }
    if (field.errors['minlength']) {
      errors.push(`Мінімальна довжина: ${field.errors['minlength'].requiredLength} символів`);
    }
    if (field.errors['maxlength']) {
      errors.push(`Максимальна довжина: ${field.errors['maxlength'].requiredLength} символів`);
    }
    if (field.errors['email']) {
      errors.push('Невірний формат email');
    }
    if (field.errors['passwordStrength']) {
      errors.push('Пароль повинен містити букви та цифри');
    }
    if (field.errors['minimumAge']) {
      errors.push(`Вік має бути не менше ${field.errors['minimumAge'].requiredAge} років`);
    }

    return errors;
  }

  // Перевірка помилки збігу паролів
  get passwordMatchError(): boolean {
    return !!(
      this.registrationForm.errors?.['passwordMatch'] && 
      this.registrationForm.get('confirmPassword')?.touched
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      // Позначити всі поля як торкнуті, щоб показати помилки
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Підготовка даних для відображення (без пароля)
    const formValue = this.registrationForm.value;
    this.submittedData = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      birthDate: formValue.birthDate
    };

    console.log('Form submitted successfully:', this.submittedData);
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.submitted = false;
    this.submittedData = null;
  }
}