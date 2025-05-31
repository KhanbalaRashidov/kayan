import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, UserForAuthenticationDto } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials: UserForAuthenticationDto = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: () => {
        // Giriş başarılı: Token localStorage'e kaydedildi
        // Örneğin, dashboard veya ana sayfaya yönlendirin
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Giriş hatası:', err);
        this.errorMessage = 'Giriş başarısız. Lütfen kullanıcı adınızı ve şifrenizi kontrol ediniz.';
      }
    });
  }
}
