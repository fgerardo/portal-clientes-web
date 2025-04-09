import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private http: HttpClient) { }

  login(username: string, password: string, coordenadas: string): Observable<any> {

    const url = environment.url.loginService;
    const body = {
      usuario: username,
      password: password,
      coordenadas: coordenadas,
      opcion: 'login',
    };

    return this.http.post<any>(url, body);
  }

  recuperaContrasena(username: string): Observable<any> {
    const url = environment.url.recuperContrasena;
    const body = {
      email: username
    };

    return this.http.post<any>(url, body);
  }

  procesarImagen(username: string, idImagen: string): Observable<any> {
    const url = environment.url.procesarImagen;

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const body = {
      usuario: username,
      imagenID: idImagen,
      numIntentos: 0,
      exitoIngresa: `Ingreso (usuario nuevo) correcto, fecha:  ${formattedDate}`
    };

    return this.http.post<any>(url, body);
  }
  verificarImagenUsuario(username: string, idImagen: string): Observable<any> {
    const url = environment.url.verificarImagenUsuario;

    const body = {
      usuario: username,
      imagenID: idImagen
    };

    return this.http.post<any>(url, body);
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Function to format the date as yyyy/MM/dd HH:mm:ss
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
}
