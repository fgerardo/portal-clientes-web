import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  crearCuentaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearCuentaComponent>
  ) {
    this.crearCuentaForm = this.fb.group({
      producto: ['', Validators.required],
      numeroPoliza: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreCompleto: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      captchaText: ['', Validators.required]
    }, { 
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() {
   
  }

  // Validador personalizado para verificar que las contraseñas coinciden
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  // Función para manejar la creación de cuenta
  crearCuenta() {
    if (this.crearCuentaForm.valid) {
      // Aquí puedes manejar la lógica de creación de cuenta
      console.log('Formulario válido:', this.crearCuentaForm.value);

      // Cerrar el diálogo después de enviar la información
      this.dialogRef.close();
    } else {
      // Si el formulario no es válido, se muestran los errores
      console.log('Formulario inválido');
    }
  }
}
