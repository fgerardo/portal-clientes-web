import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

interface Poliza {
  codigo: string;
  producto: string;
  saldo?: number;
  descripcion?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() usuario: string = '';
  @Input() fechaIngreso: string = '';
  @Output() productoSeleccionado = new EventEmitter<string>();

  constructor(private userService: AuthService) { }

  hoy = new Date().toLocaleDateString('es-MX');

  ngOnInit() {
    // Suscribirse a los cambios de usuario en el servicio
    this.userService.usuario$.subscribe(usuario => {
      this.usuario = usuario; // Actualiza el valor de userName cuando cambia.
    });
    console.log("Usuario ", this.usuario);
  }

  consultarEstatusSiniestro() {
      this.userService
        .consultarEstatusSiniestros(this.usuario) // Send the username and selected image ID
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log('Error --> ',error);
          }
        );
    
  }
}
