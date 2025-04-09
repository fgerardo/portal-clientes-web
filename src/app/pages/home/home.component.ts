import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  polizas = [
    { codigo: 'OPPT-10889', producto: 'Ahorro', saldo: 645525.04, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'OPPT-11016', producto: 'Ahorro', saldo: null, descripcion: 'SALDO' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' }
  ];

  dataProductos = [
    { tipo: 'Salud', cantidad: 2, icono: 'fa-heartbeat' },
    { tipo: 'Autos', cantidad: 1, icono: 'fa-car' },
    { tipo: 'Daños', cantidad: 1, icono: 'fa-home' },
    { tipo: 'Ahorro', cantidad: 1, icono: 'fa-piggy-bank' },
    { tipo: 'Inversión', cantidad: 1, icono: 'fa-piggy-bank' },
    { tipo: 'Protección', cantidad: 1, icono: 'fa-piggy-bank' },
  ];

  originalPolizas = [
    { tipo: 'Salud', codigo: 'GMMC-3668', descripcion: 'S.A. BÁSICA', saldo: 4360000.13 },
    { tipo: 'Salud', codigo: 'GMMI-43281', descripcion: 'S.A. BÁSICA', saldo: 145000000.00 },
    { tipo: 'Autos', codigo: 'AUIN-68578', descripcion: 'PLAN AMPLIO' },
    { tipo: 'Autos', codigo: 'AUIN-110039', descripcion: 'PLAN AMPLIO' },
    { tipo: 'Ahorro', codigo: 'OPCD-390', descripcion: '', saldo: 1303564.92 },
    { tipo: 'Ahorro', codigo: 'OPCD-390', descripcion: '', saldo: 1303564.92 },
    { tipo: 'Ahorro', codigo: 'OPCD-390', descripcion: '', saldo: 1303564.92 },
  ];
  
  selectedProducto = '';
  
filteredPolizas = [...this.originalPolizas];

filtrarPolizas(tipo: string) {
  this.filteredPolizas = this.originalPolizas.filter(p => p.tipo === tipo);
}
}
