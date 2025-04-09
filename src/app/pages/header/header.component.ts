import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userName: string = '';
  @Input() fechaIngreso: string = '';
  @Input() dataProductos: { tipo: string, cantidad: number, icono: string }[] = [];

  @Output() productoSeleccionado = new EventEmitter<string>();

  hoy = new Date().toLocaleDateString('es-MX');
  
  seleccionarProducto(tipo: string) {
    this.productoSeleccionado.emit(tipo);
  }
}
