import { Component, OnInit, Inject } from '@angular/core';
import { empleado } from 'src/app/models/empleado';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const dataEmpleados: empleado[] = [];

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Nombre', 'Cargo', 'symbol'];

  dataSource = new MatTableDataSource(dataEmpleados);
  ListEmpleados: empleado[];

  formGroupConsultaEmpleados: FormGroup = new FormGroup({
    filtroBusqueda: new FormControl('')
  });
  currentTabIndex: number;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog, private _snackBar: MatSnackBar){
  }


  ngOnInit() {
    this.ObtenerEmpleados();

    this.currentTabIndex = 0;
    this.inicializarFiltros();

    //Inicializar filtros de acuerdo a columnas mostradas en pantalla
    this.dataSource.filterPredicate = (data: empleado, filter: string) => {

      return (data.Id && String(data.Id).toLowerCase().includes(filter.toLowerCase())) ||
              data.Nombre && data.Nombre.toLowerCase().includes(filter.toLowerCase()) ||
              (data.Cargo && data.Cargo.toLowerCase().includes(filter.toLowerCase()));
    };
  }
 

  inicializarFiltros() {
    this.formGroupConsultaEmpleados = new FormGroup({
      filtroBusqueda: new FormControl('')
    });
  }

  ObtenerEmpleados() {

    this.empleadoService.getEmpleados().subscribe(resp => {
      this.ListEmpleados = resp["ListaEmpleados"];
      this.dataSource.data = this.ListEmpleados;
    });
  }
  
  DetallesEmpleado(_empleado: empleado) {
    const dialogRef = this.dialog.open(DetallesEmpleado, {
      width: '1300px',
      data: { _empleado }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  CrearEmpleado() {
    const dialogRef = this.dialog.open(CrearEmpleado, {
      width: '1300px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ObtenerEmpleados();
    });
  }

  EditarEmpleado(_empleado: empleado) {
    const dialogRef = this.dialog.open(EditarEmpleado, {
      width: '700px',
      data: { _empleado }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ObtenerEmpleados();
    });
  }

  EliminarEmpleado(_empleado: empleado) {
    this.empleadoService.eliminarEmpleado(_empleado).subscribe(resp => {
      if (resp['Respuesta'] == 1) {
        this.dialog.closeAll();
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
        this.ObtenerEmpleados();
      }
      else {
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
        this.ObtenerEmpleados();
      }
    });
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {

      duration: 2000,
    });
  }


}

@Component({
  selector: 'detalles-empleado',
  styleUrls: ['./empleado.component.css'],
  templateUrl: 'detalles-empleado.html'
})

export class DetallesEmpleado {
  formGroupEmpleado: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public dialog: MatDialog, private empleadoService: EmpleadoService) { }


  ngOnInit() {
    debugger;
    this.formGroupEmpleado = new FormGroup({
      Id: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Cargo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Contrato: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
    
    this.setFormControlValue();
  }
  
  setFormControlValue() {
    this.formGroupEmpleado.get('Id').setValue(this.data._empleado.Id);
    this.formGroupEmpleado.get('Nombre').setValue(this.data._empleado.Nombre);
    this.formGroupEmpleado.get('Cargo').setValue(this.data._empleado.Cargo);
    this.formGroupEmpleado.get('Telefono').setValue(this.data._empleado.Telefono);
    this.formGroupEmpleado.get('Contrato').setValue(this.data._empleado.Contrato);
  }

  Cerrar(){
    this.dialog.closeAll();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getErrorMessage(control: string) {
    if (this.formGroupEmpleado.get(control).hasError('required')) {
      return this.formGroupEmpleado.get(control).hasError('required') ? 'El campo es obligatorio.' : '';
    }

    if (this.formGroupEmpleado.get(control).hasError('maxlength')) {
      return this.formGroupEmpleado.get(control).hasError('maxlength') ? 'Longitud excedida.' : '';
    }
  }
}

@Component({
  selector: 'crear-empleado',
  styleUrls: ['./empleado.component.css'],
  templateUrl: 'crear-empleado.html'
})

export class CrearEmpleado {
  formGroupEmpleado: FormGroup;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private empleadoService: EmpleadoService) { }


  ngOnInit() {
    this.formGroupEmpleado = new FormGroup({
      Id: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Cargo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Contrato: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {

      duration: 2000,
    });
  }

  CrearEmpleado() {

    let data: empleado = {
      Id: 0,
      Nombre: String(this.formGroupEmpleado.get('Nombre').value),
      Cargo: String(this.formGroupEmpleado.get('Cargo').value),
      Telefono: String(this.formGroupEmpleado.get('Telefono').value),
      Contrato: String(this.formGroupEmpleado.get('Contrato').value)
    }

    this.empleadoService.crearEmpleado(data).subscribe(resp => {
      if (resp['Respuesta'] == 1) {
        this.dialog.closeAll();
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
      }
      else {
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
      }
    });
  }

  getErrorMessage(control: string) {
    if (this.formGroupEmpleado.get(control).hasError('required')) {
      return this.formGroupEmpleado.get(control).hasError('required') ? 'El campo es obligatorio.' : '';
    }

    if (this.formGroupEmpleado.get(control).hasError('maxlength')) {
      return this.formGroupEmpleado.get(control).hasError('maxlength') ? 'Longitud excedida.' : '';
    }
  }
}

@Component({
  selector: 'editar-empleado',
  styleUrls: ['./empleado.component.css'],
  templateUrl: 'editar-empleado.html'
})

export class EditarEmpleado {
  formGroupEmpleado: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public dialog: MatDialog, private empleadoService: EmpleadoService) { }


  ngOnInit() {

    this.formGroupEmpleado = new FormGroup({
      Id: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Cargo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Contrato: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
    
    this.setFormControlValue();
  }
  
  setFormControlValue() {
    this.formGroupEmpleado.get('Id').setValue(this.data._empleado.Id);
    this.formGroupEmpleado.get('Nombre').setValue(this.data._empleado.Nombre);
    this.formGroupEmpleado.get('Cargo').setValue(this.data._empleado.Cargo);
    this.formGroupEmpleado.get('Telefono').setValue(this.data._empleado.Telefono);
    this.formGroupEmpleado.get('Contrato').setValue(this.data._empleado.Contrato);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {

      duration: 2000,
    });
  }

  ActualizarEmpleado() {

    let data: empleado = {
      Id: Number(this.formGroupEmpleado.get('Id').value),
      Nombre: String(this.formGroupEmpleado.get('Nombre').value),
      Cargo: String(this.formGroupEmpleado.get('Cargo').value),
      Telefono: String(this.formGroupEmpleado.get('Telefono').value),
      Contrato: String(this.formGroupEmpleado.get('Contrato').value)
    }

    this.empleadoService.modificarEmpleado(data).subscribe(resp => {
      if (resp['Respuesta'] == 1) {
        this.dialog.closeAll();
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
      }
      else {
        this.openSnackBar(resp['Mensaje'], 'Aceptar');
      }
    });
  }

  getErrorMessage(control: string) {
    if (this.formGroupEmpleado.get(control).hasError('required')) {
      return this.formGroupEmpleado.get(control).hasError('required') ? 'El campo es obligatorio.' : '';
    }

    if (this.formGroupEmpleado.get(control).hasError('maxlength')) {
      return this.formGroupEmpleado.get(control).hasError('maxlength') ? 'Longitud excedida.' : '';
    }
  }
}
