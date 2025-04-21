import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Vigencias {
  fechaHasta: string;
  fechaDesde: string;
  producto: string;
  familia: string;
}
@Component({
  selector: 'app-vigencias-modal',
  templateUrl: './vigencias-modal.component.html',
  styleUrls: ['./vigencias-modal.component.css']
})
export class VigenciasModalComponent {
  vigencias: Vigencias[] = [];

   constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<VigenciasModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { vigencias: Vigencias[] }
    ) {}

    ngOnInit(): void{
      debugger;
      this.vigencias = this.data.vigencias;
    }

    cerrar(): void {
      this.dialogRef.close();
    }
}
