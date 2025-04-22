import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ProximosPagos {
  fechaVencimiento: string;
  importeAPagar: string;
  producto: string;
}
@Component({
  selector: 'app-proximos-pagos-modal',
  templateUrl: './proximos-pagos-modal.component.html',
  styleUrls: ['./proximos-pagos-modal.component.css']
})
export class ProximosPagosModalComponent {
  proximosPagos: ProximosPagos[] = [];

   constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ProximosPagosModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { proximosPagos: ProximosPagos[] }
    ) {}

    ngOnInit(): void{
      debugger;
      this.proximosPagos = this.data.proximosPagos;
    }

    cerrar(): void {
      this.dialogRef.close();
    }
}
