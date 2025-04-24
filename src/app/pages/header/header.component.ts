import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { TramitesModalComponent } from '../tramites-modal/tramites-modal.component';
import { VigenciasModalComponent } from '../vigencias-modal/vigencias-modal.component';
import { environment } from 'src/enviroments/environment.development';
import { ProximosPagosModalComponent } from '../proximos-pagos-modal/proximos-pagos-modal.component';
import { ResumenSaldosModalComponent } from '../resumen-saldos-modal/resumen-saldos-modal.component';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  isClientePension: boolean = false;
  fotoCliente: string = '';

  constructor(private userService: AuthService, private router: Router, private userDataService: UserDataService, private dialog: MatDialog, private spinnerService: SpinnerService) {
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
      this.nombreUsuario = this.userDataService.getUserData().cliente.nombreCliente || '';
      this.fechaClienteDesde = this.userDataService.getUserData().cliente.clienteDesde || '';
      this.fechaActualizada = this.userDataService.getUserData().cliente.fechaUltimaActualizacion || this.hoy;
      this.isClientePension = this.userDataService.getUserData().clientePensiones.pension;
      this.fotoCliente = this.userDataService.getUserData().cliente.fotoCliente;
    }
  }

  consultarEstatusSiniestro() {
    this.spinnerService.show();
    this.userService
      .consultarEstatusSiniestros(this.usuario) // Send the username and selected image ID
      .subscribe(
        (response) => {
          this.spinnerService.hide();
          console.log(response);
        },
        (error) => {
          this.spinnerService.hide();
          console.log('Error --> ', error);
        }
      );

  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


  abrirModal() {
    debugger;
    const polizas = this.userDataService.getUserData().polizaStr.map((p: any) => ({
      numeroPoliza: p.poliza.generales.numeroPoliza,
      familiaPoliza: p.poliza.generales.familiaPoliza
    }));
    const listaTramites = this.userDataService.getUserData().tramitesStr.listaTramites;

    this.dialog.open(TramitesModalComponent, {
      data: {
        listaTramites,
        polizas
      },
      width: '550px'
    });
  }

  abrirModalVigencias() {
    const vigencias = this.userDataService.getUserData().vigencias;

    this.dialog.open(VigenciasModalComponent, {
      data: {
        vigencias
      },
      width: '550px'
    });
  }

  abrirModalProximosPagos(){
    const proximosPagos = this.userDataService.getUserData().proximosPagos;

    this.dialog.open(ProximosPagosModalComponent, {
      data: {
        proximosPagos
      },
      width: '550px'
    });
  }

  abrirPaginaPensiones() {
    const idclie = this.userDataService.getUserData().clientePensiones.idclie;
    const urlPensiones = environment.web.portalFindAdvance + idclie;
    window.open(urlPensiones, '_blank');
  }

  abrirModalResumenSaldos(){
    debugger;
    const resumenSaldo = this.userDataService.getUserData().sumasPolizas;
    this.dialog.open(ResumenSaldosModalComponent, {
      data: {
        resumenSaldo
      },
      width: '550px'
    });
  }
}
