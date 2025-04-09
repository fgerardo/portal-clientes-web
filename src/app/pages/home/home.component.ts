import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  polizas = [
    { codigo: 'OPPT-10889', producto: 'Ahorro', saldo: 645525.04, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'OPPT-11016', producto: 'Ahorro', saldo: null, descripcion: 'SALDO' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' }
  ];

  dataProductos = [
    { name: 'Ahorro', value: 2 },
    { name: 'Salud', value: 1 },
    { name: 'Autos', value: 0 },
    { name: 'Inversión', value: 0 },
    { name: 'Protección', value: 0 },
    { name: 'Daños', value: 0 }
  ];

  selectedProducto = '';
  filteredPolizas = this.polizas;

  filtrarPolizas(producto: string) {
    this.selectedProducto = producto;
    this.filteredPolizas = this.polizas.filter(p => p.producto === producto);
  }
}
