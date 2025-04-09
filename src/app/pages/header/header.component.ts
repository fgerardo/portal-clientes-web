import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Coordenadas del centro y radios de la dona
  readonly cx = 200;
  readonly cy = 200;
  readonly radioExterior = 180;
  readonly radioInterior = 120;

  // Lista de familias que aparecen en la dona
  familias = ['Ahorro', 'Salud', 'Daños', 'Protección', 'Inversión', 'Autos'];

  // Sectores con ángulos definidos para el SVG
  sectores = this.familias.map((familia, index) => {
    const total = this.familias.length;
    const angInicio = (360 / total) * index;
    const angFin = (360 / total) * (index + 1);
    return {
      familia,
      angInicio,
      angFin,
      class: 'f' + familia.charAt(0).toUpperCase() + familia.slice(1)
    };
  });

  // Genera un path SVG tipo arco de dona entre dos ángulos
  generarPath(angInicio: number, angFin: number): string {
    const toRadians = (angle: number) => (angle - 90) * Math.PI / 180;

    const x1 = this.cx + this.radioExterior * Math.cos(toRadians(angInicio));
    const y1 = this.cy + this.radioExterior * Math.sin(toRadians(angInicio));
    const x2 = this.cx + this.radioExterior * Math.cos(toRadians(angFin));
    const y2 = this.cy + this.radioExterior * Math.sin(toRadians(angFin));

    const x3 = this.cx + this.radioInterior * Math.cos(toRadians(angFin));
    const y3 = this.cy + this.radioInterior * Math.sin(toRadians(angFin));
    const x4 = this.cx + this.radioInterior * Math.cos(toRadians(angInicio));
    const y4 = this.cy + this.radioInterior * Math.sin(toRadians(angInicio));

    const largeArc = angFin - angInicio > 180 ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${this.radioExterior} ${this.radioExterior} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${this.radioInterior} ${this.radioInterior} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
  }

  // Selección y filtrado (puedes adaptar según tu lógica)
  selectedProducto = '';

  filtroDisponible(familia: string): boolean {
    return true; // Aquí puedes controlar disponibilidad si hace falta
  }

  seleccionarProducto(familia: string) {
    this.selectedProducto = familia;
    console.log('Producto seleccionado:', familia);
    // Aquí podrías filtrar las pólizas u otra lógica
  }

  // Colores para cada familia (puedes personalizar)
  getColorForFamily(familia: string): string {
    switch (familia.toLowerCase()) {
      case 'ahorro': return '#cfd8dc';
      case 'salud': return '#90caf9';
      case 'daños': return '#1565c0';
      case 'protección': return '#00bcd4';
      case 'inversión': return '#b0bec5';
      case 'autos': return '#bdbdbd';
      default: return '#e0e0e0';
    }
  }
}
