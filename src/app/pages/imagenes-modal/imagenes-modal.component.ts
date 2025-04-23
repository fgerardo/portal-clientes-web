import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-imagenes-modal',
  templateUrl: './imagenes-modal.component.html',
  styleUrls: ['./imagenes-modal.component.css']
})
export class ImagenesModalComponent {
  imagenSeleccionada: any = null;
  username: string;
  flujo: string;
  mostrarModalConfirmacion = false;
  errorMessage: string = '';
  usuarioAutenticado: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imagenes: { url: string, idImagen: string }[], flujo: string, usuario: string, usuarioAutenticado: string },
    public dialogRef: MatDialogRef<ImagenesModalComponent>,
    private router: Router,
    private loginService: AuthService,
    private errorService: ErrorService,
    private userDataService: UserDataService,
    private spinnerService: SpinnerService
  ) {
    this.username = data.usuario; // Receive username from parent
    this.flujo = data.flujo; // Receive flujo from parent
    this.usuarioAutenticado = data.usuarioAutenticado;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  seleccionarImagen(imagen: any) {
    this.imagenSeleccionada = imagen;
  }

  seleccionarImagenConfirmada() {
    if (this.data.flujo === '1') {
      this.spinnerService.show();
      // Si es flujo 1, redirige al Home directamente
      const idImagen = this.imagenSeleccionada.idImagen; // You can modify this according to your data structure
      this.loginService
        .verificarImagenUsuario(this.username, idImagen) // Send the username and selected image ID
        .subscribe(
          (response) => {
            if (response.response) {
              this.spinnerService.hide();
              this.accesoPortal();
              this.loginService.setUsuario(this.username);
            } else {
              this.spinnerService.hide();
              this.errorService.setErrorMessage('La imagen seleccionada no es la correcta.');  // Set error message in the service
            }
            this.dialogRef.close();
          },
          (error) => {
            this.spinnerService.hide();
            this.errorService.setErrorMessage('Hubo un error al intentar la solicitud.');
            this.dialogRef.close(); // Cierra el modal principal después de guarda
          }
        );
    }
  }

  // Función que se llama cuando se hace clic en "Confirmar"
  mostrarConfirmacion() {
    if (this.imagenSeleccionada) {
      this.mostrarModalConfirmacion = true;

    }
  }

  // Función para cerrar el modal de confirmación
  cerrarConfirmacion() {
    this.mostrarModalConfirmacion = false;
  }

  // Función para guardar la imagen seleccionada
  guardarImagen() {
    // Lógica para guardar la imagen seleccionada
    console.log('Imagen guardada:', this.imagenSeleccionada);
    this.spinnerService.show();
    // Después de guardar, cerramos el modal
    this.mostrarModalConfirmacion = false;
    // Send the selected image's idImagen to the backend
    const idImagen = this.imagenSeleccionada.idImagen; // You can modify this according to your data structure
    this.loginService
      .procesarImagen(this.username, idImagen) // Send the username and selected image ID
      .subscribe(
        (response) => {
          console.log('Imagen procesada:', response);
          this.spinnerService.hide();
          this.mostrarModalConfirmacion = false;
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error de conexión:', error);
          this.spinnerService.hide();
          this.mostrarModalConfirmacion = false;
          this.errorMessage = 'Hubo un error al intentar la solicitud.';
        }
      );
    this.dialogRef.close(); // Cierra el modal principal después de guarda
  }

  accesoPortal() {
    this.spinnerService.show();
    this.loginService.accesoPortal(this.usuarioAutenticado, this.username).subscribe(
      (response) => {
        console.log(response);
        const rol = response.response.rol;
        const encrypt = response.response.encrypt;
        this.spinnerService.hide();
        if (rol.toUpperCase() === 'C') {
          console.log("entro el rol de cliente ", rol);
          this.headerPortal(encrypt)
        } else {
          console.log("entro el rol de Agente ", rol);
        }
      }, (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    )
  }

  headerPortal(parametro: string) {
    this.spinnerService.show();
    this.loginService.headerPortal(parametro).subscribe(
      (response) => {
        this.spinnerService.hide();
        console.log(response);
         // Redirigir a /home con datos en el state
      this.router.navigate(['/home'], {
        state: { userData: response.response } // 👈 Pasamos los datos aquí
      });
      }, (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    )
  }
}
