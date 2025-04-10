import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Poliza {
  codigo: string;
  producto: string;
  saldo?: number;
  descripcion?: string;
}

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent {

  @Input() userName: string = '';
  @Input() fechaIngreso: string = '';
  @Output() productoSeleccionado = new EventEmitter<string>();

  hoy = new Date().toLocaleDateString('es-MX');
  selectedFamilia: string | null = null;

  // 🔸 Lista completa de pólizas
  polizas: Poliza[] = [
    { codigo: 'OPPT-10889', producto: 'Ahorro', saldo: 645525.04, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'OPPT-11016', producto: 'Ahorro', saldo: 1246.55, descripcion: 'SALDO' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'PLU2-43804', producto: 'Salud', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'SVIP-43804', producto: 'Inversion', saldo: 0, descripcion: 'SALDO MONEDA LOCAL' },
    { codigo: 'AUIN-43804', producto: 'Autos', saldo: 540730.66, descripcion: 'SALDO MONEDA LOCAL' }
  ];

  selectedProducto: string = '';
  polizasFiltradas: Poliza[] = this.polizas;

  dataFamilias: any = {
    ahorro: true,
    salud: true,
    hogar: false,
    proteccion: false,
    inversion: true,
    auto: true,
  };

  sectores = [
    { familia: 'ahorro', angInicio: 0, angFin: 60, class: 'p1' },
    { familia: 'salud', angInicio: 60, angFin: 120, class: 'p2' },
    { familia: 'hogar', angInicio: 120, angFin: 180, class: 'p3' },
    { familia: 'proteccion', angInicio: 180, angFin: 240, class: 'p4' },
    { familia: 'inversion', angInicio: 240, angFin: 300, class: 'p5' },
    { familia: 'auto', angInicio: 300, angFin: 360, class: 'p6' }
  ];

  getColorForFamily(familia: string): string {
    const colores: Record<string, string> = {
      ahorro: '#01589f',
      salud: '#00b2d4',
      hogar: '#bbc2b2',
      proteccion: '#cce7e8',
      inversion: '#dbdee3',
      auto: '#94b6df'
    };
    return this.dataFamilias[familia] ? colores[familia] : '#e2e2e2';
  }

  // Función para limpiar el filtro y mostrar todas las pólizas
  limpiarFiltro() {
    this.selectedFamilia = null;
    this.polizasFiltradas = this.polizas; // Restablecer todas las pólizas
  }

  filtroDisponible(familia: string): boolean {
    return this.dataFamilias[familia];
  }

  seleccionarProducto(familia: string) {
    console.log('Seleccionado:', familia);
    this.selectedFamilia = familia;
    // Filtrar las pólizas según la familia seleccionada
    this.polizasFiltradas = this.filtrarPolizas(familia);

    this.selectedProducto = familia.charAt(0).toUpperCase() + familia.slice(1);
    this.polizasFiltradas = this.polizas.filter(p => p.producto.toLowerCase() === familia.toLowerCase());
  }

  // Función para filtrar las pólizas (ejemplo)
  filtrarPolizas(familia: string) {
    // Lógica para filtrar las pólizas por familia
    return this.polizas.filter(poliza => poliza.producto.toLowerCase() === familia.toLowerCase());
  }


  generarPath(angInicio: number, angFin: number): string {
    const cx = 200, cy = 200;
    const rOuter = 180, rInner = 100;

    const rad = (deg: number) => (deg - 90) * Math.PI / 180;

    const x1 = cx + rOuter * Math.cos(rad(angInicio));
    const y1 = cy + rOuter * Math.sin(rad(angInicio));
    const x2 = cx + rOuter * Math.cos(rad(angFin));
    const y2 = cy + rOuter * Math.sin(rad(angFin));

    const x3 = cx + rInner * Math.cos(rad(angFin));
    const y3 = cy + rInner * Math.sin(rad(angFin));
    const x4 = cx + rInner * Math.cos(rad(angInicio));
    const y4 = cy + rInner * Math.sin(rad(angInicio));

    const largeArcFlag = angFin - angInicio <= 180 ? 0 : 1;

    return `M ${x1},${y1} A ${rOuter},${rOuter} 0 ${largeArcFlag} 1 ${x2},${y2} L ${x3},${y3} A ${rInner},${rInner} 0 ${largeArcFlag} 0 ${x4},${y4} Z`;
  }
}
