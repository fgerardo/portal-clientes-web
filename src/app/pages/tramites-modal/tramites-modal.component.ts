import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tramites-modal',
  templateUrl: './tramites-modal.component.html',
  styleUrls: ['./tramites-modal.component.css'],
})
export class TramitesModalComponent implements OnInit {
  form!: FormGroup;
  polizas: any[] = [];
  tramitesFiltrados: any[] = [];

  tramitesSinObservacion = [
    'Traspaso entre alternativas de inversión',
    'Cambiar conducto de cobro',
    'Retiro desde alternativas',
    'Redistribución de aportaciones',
    'Cambio de fecha de pago'
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TramitesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.polizas = this.data.polizas;

    this.form = this.fb.group({
      poliza: ['', Validators.required],
      tramite: [{ value: '', disabled: true }, Validators.required],
      observaciones: ['']
    });

    // Detecta cambio de póliza
    this.form.get('poliza')?.valueChanges.subscribe((poliza) => {
      if (poliza) {
        this.filtrarTramites(poliza.familiaPoliza);
        this.form.get('tramite')?.enable();
        this.form.get('tramite')?.reset();
        this.form.get('observaciones')?.setValue('');
      } else {
        this.form.get('tramite')?.disable();
        this.form.get('tramite')?.reset();
        this.form.get('observaciones')?.reset();
      }
    });

    // Detecta cambio de trámite
    this.form.get('tramite')?.valueChanges.subscribe((tramite) => {
      const requiereObs = tramite && !this.tramitesSinObservacion.includes(tramite.tramite);
      const obsControl = this.form.get('observaciones');
    
      if (requiereObs) {
        obsControl?.setValidators(Validators.required);
      } else {
        obsControl?.clearValidators();
        obsControl?.setValue('');
      }
    
      obsControl?.updateValueAndValidity();
    });
    
  }


  filtrarTramites(familia: string) {
    const grupo = this.data.listaTramites.find((t: { tipoPoliza: string; }) => t.tipoPoliza === familia);
    this.tramitesFiltrados = grupo ? grupo.tramites : [];
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Formulario válido:', this.form.value);
    // Aquí podrías hacer el submit real
    this.dialogRef.close(this.form.value);
  }

  mostrarObservacionesYBoton(): boolean {
    const tramite = this.form.get('tramite')?.value;
    return tramite && !this.tramitesSinObservacion.includes(tramite.tramite);
  }
}
