import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getGeolocation(): Observable<{ latitude: number, longitude: number }> {
    return new Observable((observer: Observer<any>) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          (error) => {
            observer.error(error);
          },
          {
            enableHighAccuracy: true, // Usa la mejor precisión posible
            timeout: 10000,            // Tiempo de espera de 10 segundos
            maximumAge: 0              // No usa una localización almacenada previamente
          }
        );
      } else {
        observer.error("La geolocalización no es compatible con este navegador.");
      }
    });
  }
}
