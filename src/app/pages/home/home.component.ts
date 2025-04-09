import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  usuario = {
    nombre: 'MAURICIO HUESCA RODRIGUEZ',
    fechaCliente: '01/09/2014'
  };

  fechaActualizacion = '10/12/2024';

  polizas = [
    {
      clave: 'OPPT-10889',
      saldo: '$645,525.04'
    },
    {
      clave: 'OPPT-11016',
      saldo: 'No disponible'
    },
    {
      clave: 'PLU2-43804',
      saldo: '$540,730.66'
    }
  ];

  categorias = [
    { nombre: 'Ahorro', icon: '💰' },
    { nombre: 'Salud', icon: '🏥' },
    { nombre: 'Daños', icon: '🏠' },
    { nombre: 'Protección', icon: '☂️' },
    { nombre: 'Inversión', icon: '🪙' },
    { nombre: 'Autos', icon: '🚗' }
  ];
}
