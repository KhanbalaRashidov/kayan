import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserForAuthenticationDto {
  userName: string;
  password: string;
}

export interface TokenDto {
  token: string;
  // Gerekirse diğer token bilgileri (örn. expiration) ekleyebilirsiniz.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: UserForAuthenticationDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/api/authentication/login`, user)
      .pipe(
        tap(response => {
          // Token'ı localStorage'e kaydet
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('userName', user.userName);
        })
      );
  }

  getUserId():Observable<string>{
    var username= localStorage.getItem("userName");
    return this.http.get<string>(`${this.baseUrl}/api/authentication?username=${username}`)
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
