import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  email: string = '';
  mensaje: string = '';
  exito: boolean = false;

  constructor(private dialogRef: MatDialogRef<RecuperarContrasenaComponent>, private loginService: AuthService, private dialog: MatDialog) { }
  onEnviar() {
    if (!this.email) return;
    console.log('Enviando correo a:', this.email);

    this.loginService.recuperaContrasena(this.email).subscribe(
      (response: any) => {
        // Aquí 'response' es la respuesta del backend
        console.log('Respuesta de recuperación:', response);

        // Mostrar el mensaje de la respuesta al usuario
        if (response.ok) {
          this.mensaje = response.response.mensaje;  // Aquí tomamos el mensaje de la respuesta
          this.exito = response.response.estatus == 1 ? false : true ;  // Aquí tomamos el mensaje de la respuesta
          console.log('Mensaje para el usuario:', this.mensaje);

          // Cerrar el modal después de mostrar el mensaje
          this.dialogRef.close({ mensaje: this.mensaje, success: this.exito });  // Cerrar y enviar datos al componente padre si es necesario

          // Abrir el modal de mensaje
          this.openMensajeModal({ mensaje: this.mensaje, success: this.exito });

        } else {
          this.mensaje = "Hubo un problema al procesar la solicitud.";
          this.dialogRef.close({ mensaje: this.mensaje, success: false });  // Cerrar y enviar error al componente padre

          // Abrir el modal de mensaje de error
          this.openMensajeModal({ mensaje: this.mensaje, success: false });
        }
      },
      (error) => {
        console.error('Error de conexión:', error);
        this.mensaje = 'Hubo un error al intentar la solicitud.';
        this.dialogRef.close({ mensaje: this.mensaje, success: false });  // Cerrar y enviar error al componente padre

        // Abrir el modal de mensaje de error
        this.openMensajeModal({ mensaje: this.mensaje, success: false });
      }
    );
  }


  onClose() {
    this.dialogRef.close();
  }

  openMensajeModal(data: any) {
    const dialogRef = this.dialog.open(MensajeModalComponent, {
      width: '600px',
      data: data  // Pasamos los datos al modal
    });

    // Obtener los datos que se enviaron cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró con los siguientes datos:', result);

      // Aquí puedes usar los datos del modal para actualizar la UI o hacer algo más
      if (result) {
        // Por ejemplo, mostrar el mensaje en un campo o en una notificación
        this.mensaje = result.mensaje;  // 'result' contiene los datos enviados desde el modal
        if (result.exito) {
          console.log('Operación exitosa');
        } else {
          console.log('Hubo un error en la operación');
        }
      }
    });
  }

}
