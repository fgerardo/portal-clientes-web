import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imagenes: { url: string, idImagen: string }[], flujo: string, usuario: string },
    public dialogRef: MatDialogRef<ImagenesModalComponent>,
    private router: Router,
    private loginService: AuthService,
    private errorService: ErrorService
  ) {
    this.username = data.usuario; // Receive username from parent
    this.flujo = data.flujo; // Receive flujo from parent
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  seleccionarImagen(imagen: any) {
    this.imagenSeleccionada = imagen;
  }

  seleccionarImagenConfirmada() {
    if (this.data.flujo === '1') {
      // Si es flujo 1, redirige al Home directamente
      const idImagen = this.imagenSeleccionada.idImagen; // You can modify this according to your data structure
      this.loginService
        .verificarImagenUsuario(this.username, idImagen) // Send the username and selected image ID
        .subscribe(
          (response) => {
            if (response.response) { // Si la respuesta es true
              this.router.navigate(['/home']); // Redirigir al Home
            } else {
              this.errorService.setErrorMessage('La imagen seleccionada no es la correcta.');  // Set error message in the service
            }
            this.dialogRef.close();
          },
          (error) => {
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

    // Después de guardar, cerramos el modal
    this.mostrarModalConfirmacion = false;
    // Send the selected image's idImagen to the backend
    const idImagen = this.imagenSeleccionada.idImagen; // You can modify this according to your data structure
    this.loginService
      .procesarImagen(this.username, idImagen) // Send the username and selected image ID
      .subscribe(
        (response) => {
          console.log('Imagen procesada:', response);
          this.mostrarModalConfirmacion = false;
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error de conexión:', error);
          this.mostrarModalConfirmacion = false;
          this.errorMessage = 'Hubo un error al intentar la solicitud.';
        }
      );
    this.dialogRef.close(); // Cierra el modal principal después de guarda
  }
}
