import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { TramitesModalComponent } from '../tramites-modal/tramites-modal.component';
import { VigenciasModalComponent } from '../vigencias-modal/vigencias-modal.component';

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
  @Output() productoSeleccionado = new EventEmitter<string>();

  // Variables para mostrar en el HTML
  nombreUsuario: string = '';
  fechaClienteDesde: string = '';
  fechaActualizada: string = '';

  constructor(private userService: AuthService, private router: Router, private userDataService: UserDataService, private dialog: MatDialog) {
    // 👇 Recuperamos el state
    console.log('Datos recibidos en HeaderComponent:', this.userDataService.getUserData());
  }


  hoy = new Date().toLocaleDateString('es-MX');

  ngOnInit() {
    // Suscribirse a los cambios de usuario en el servicio
    this.userService.usuario$.subscribe(usuario => {
      this.usuario = usuario; // Actualiza el valor de userName cuando cambia.
    });
    console.log("Usuario ", this.usuario);

    if (this.userDataService.getUserData()) {
      this.nombreUsuario = this.userDataService.getUserData().generales.nombreCliente || '';
      this.fechaClienteDesde = this.userDataService.getUserData().generales.clienteDesde || '';
      this.fechaActualizada = this.userDataService.getUserData().generales.fechaUltimaActualizacion || this.hoy;
    }
  }

  consultarEstatusSiniestro() {
    this.userService
      .consultarEstatusSiniestros(this.usuario) // Send the username and selected image ID
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Error --> ', error);
        }
      );

  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


  abrirModal() {
    const polizas = this.userDataService.getUserData().poliza.map((p: any) => ({
      numeroPoliza: p.poliza.generales.numeroPoliza,
      familiaPoliza: p.poliza.generales.familiaPoliza
    }));
    const listaTramites = this.userDataService.getUserData().tramites.listaTramites;

    this.dialog.open(TramitesModalComponent, {
      data: {
        listaTramites,
        polizas
      },
      width: '550px'
    });
  }

  abrirModalVigencias() {
    debugger;
    const vigencias = this.userDataService.getUserData().vigencias;

    this.dialog.open(VigenciasModalComponent, {
      data: {
        vigencias
      },
      width: '550px'
    });
  }

}
