import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface InfoPesos {
  producto: string;
  codMoneda: string;
  emisor: string;
  familia: string;
  saldo: string;
}

interface ResumenGrupo {
  sumaPolizaPesos: string;
  sumaPolizaDolares: string;
  infoPesos: InfoPesos[];
  infoDolares: any[];
}
@Component({
  selector: 'app-resumen-saldos-modal',
  templateUrl: './resumen-saldos-modal.component.html',
  styleUrls: ['./resumen-saldos-modal.component.css']
})
export class ResumenSaldosModalComponent {
  resumenAhorro: ResumenGrupo[] = [];
  resumenSalud: ResumenGrupo[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,       public dialogRef: MatDialogRef<ResumenSaldosModalComponent>,) {
    debugger;
    const resumen = data?.resumenSaldo;
    this.resumenAhorro = resumen.resumenAhorro || [];
    this.resumenSalud = resumen.resumenSalud || [];
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
