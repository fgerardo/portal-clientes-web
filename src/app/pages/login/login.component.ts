import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagenesModalComponent } from '../imagenes-modal/imagenes-modal.component';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component';
import { ErrorService } from 'src/app/services/error.service';
import { RecuperarContrasenaComponent } from '../recuperar-contrasena/recuperar-contrasena.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  coordenadas: string = '';


  constructor(private loginService: AuthService, private geolocationService: GeolocationService, 
    private dialog: MatDialog, private errorService: ErrorService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.errorService.error$.subscribe(message => {
      this.errorMessage = message;  // Update the errorMessage whenever it changes
    });
  }

  onLogin(loginForm: NgForm) {
    this.spinnerService.show(); // Mostrar spinner global
    if (loginForm.valid) {
      // Obtiene las coordenadas antes de hacer login
      this.geolocationService.getGeolocation().subscribe(
        (coordinates) => {
          this.spinnerService.hide(); // Ocultar spinner
          // Al obtener la geolocalización, asignamos las coordenadas
          this.coordenadas = `Latitud: ${coordinates.latitude}, Longitud: ${coordinates.longitude}`;
          console.log('Coordenadas obtenidas:', this.coordenadas);
          // Llamar al servicio de login con las coordenadas
          this.realizarLogin(this.coordenadas);
        },
        (error) => {
          this.spinnerService.hide(); // Ocultar spinner
          console.log('Error al obtener geolocalización:', error);
          // Si hay un error con la geolocalización, puedes manejarlo aquí
          this.coordenadas = 'Latitud: N/A, Longitud: N/A';
          this.realizarLogin(this.coordenadas);
        }
      );
    } else {
      this.spinnerService.hide(); // Ocultar spinner
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

  realizarLogin(coordenadas: string) {
    // Llamar al servicio de login
    this.spinnerService.show(); // Ocultar spinner
    this.loginService
      .login(this.username, this.password, coordenadas)
      .subscribe(
        (response) => {
          this.manejarRespuesta(response);
        },
        (error) => {
          this.spinnerService.hide(); // Ocultar spinner
          console.error('Error de conexión:', error);
          this.errorMessage = 'Hubo un error al intentar la solicitud.';
        }
      );
  }

  recuperaContrasena() {
    // Llamar al servicio de login
    this.loading = true;
    this.loginService
      .recuperaContrasena(this.username)
      .subscribe(
        (response) => {

          this.loading = false;
          this.manejarRespuesta(response);
        },
        (error) => {
          this.loading = false;
          console.error('Error de conexión:', error);
          this.errorMessage = 'Hubo un error al intentar la solicitud.';
        }
      );
  }

  manejarRespuesta(responseData: any) {
    const response = responseData?.response;

    if (!response) {
      this.spinnerService.hide(); // Ocultar spinner
      this.errorMessage = 'Respuesta inválida del servidor.';
      return;
    }

    const estatus = response.estatus;

    switch (estatus) {
      case 1:
        this.errorMessage = responseData.response.mensaje;
        break;
      case 3:
      case '2':
        this.errorMessage = responseData.response.mensaje;
        break;
      case '4':
        this.errorMessage = responseData.response.mensaje;
        break;
      case 0:
        this.errorMessage = '';
        const imagenes = responseData.response.img?.map((imgObj: any) => ({
          url: imgObj.url,
          idImagen: imgObj.idImagen
        })) || [];

        console.log("imagenes ", imagenes.idImagen);
        // Shuffle the images randomly
        const shuffledImages = this.shuffleArray(imagenes);

        console.log("shuffledImages ", shuffledImages);

        const flujo = responseData.response.flujo;
        const usuario = this.username;
        const usuarioAutenticado = response.respuesta;
        this.dialog.open(ImagenesModalComponent, {
          data: { imagenes: shuffledImages, flujo, usuario, usuarioAutenticado },
          maxWidth: '90vw',   // límite de ancho basado en el viewport
          width: 'auto'       // permite que el contenido defina el ancho
        });
        break;
      default:
        this.errorMessage = 'Respuesta desconocida del servidor.';
        break;
    }
    this.spinnerService.hide(); // Ocultar spinner
  }

  abrirModalCrearCuenta(): void {
    this.dialog.open(CrearCuentaComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true
    });
  }

  abrirRecuperarContrasena() {
    this.dialog.open(RecuperarContrasenaComponent, {
      width: '400px'
    });
  }

  // Shuffle function to randomize the order of images
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
}
