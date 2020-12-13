import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { httpHeadersSettings } from './httpHeadersSettings';
import { empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private headerSettings : httpHeadersSettings;
  private urlgetEmpleados = 'api/Empleado/ObtenerEmpleados';
  private urlcrearEmpleado = 'api/Empleado/CrearEmpleado';
  private urlmodificarEmpleado = 'api/Empleado/ModificarEmpleado';
  private urleliminarEmpleado = 'api/Empleado/EliminarEmpleado';

  constructor(private http: HttpClient) {
    this.headerSettings = new httpHeadersSettings();
   }

  getEmpleados() {
    return this.http.post<any>(this.getUrl(this.urlgetEmpleados), null, this.headerSettings.getHttpOptionsNoAuth());
  }

  crearEmpleado(data: empleado) {
    return this.http.post<any>(this.getUrl(this.urlcrearEmpleado), data, this.headerSettings.getHttpOptionsNoAuth()).pipe();
  }

  modificarEmpleado(data: empleado) {
    return this.http.post<any>(this.getUrl(this.urlmodificarEmpleado), data, this.headerSettings.getHttpOptionsNoAuth()).pipe();
  }

  eliminarEmpleado(data: empleado) {
    return this.http.post<any>(this.getUrl(this.urleliminarEmpleado), data, this.headerSettings.getHttpOptionsNoAuth()).pipe();
  }

  getUrl(_url: string): string {
    return environment.baseUrl + _url;
  }

}
