using Entities;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Business
{
    public class BEmpleado
    {
        public ListEmpleados ObtenerEmpleados()
        {
            var lstEmpleados = new List<EmpleadoEntity>();

            ListEmpleados ListaEmpleados = new ListEmpleados
            {
                ListaEmpleados = new List<EmpleadoEntity>()
            };

            try
            {
                var empResult = new DEmpleado().ObtenerEmpleados();

                if (empResult != null && empResult.Any())
                {
                    foreach (var item in empResult)
                    {
                        var result = new EmpleadoEntity()
                        {
                            Id = item.Id,
                            Nombre = item.Nombre,
                            Cargo = item.Cargo,
                            Telefono = item.Telefono,
                            Contrato = item.Contrato
                        };

                        lstEmpleados.Add(result);
                    }
                }

                if (lstEmpleados.Any())
                {
                    ListaEmpleados.ListaEmpleados = lstEmpleados;
                    ListaEmpleados.Mensaje = "Registros encontrados: " + lstEmpleados.Count.ToString();
                    ListaEmpleados.Respuesta = 1;

                    return ListaEmpleados;
                }

                ListaEmpleados.Mensaje = "No hay registros";
                ListaEmpleados.Respuesta = 0;

                return ListaEmpleados;
            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }
        }

        public Resultado CrearEmpleado(EmpleadoEntity empleado, ref string identity)
        {
            Resultado respuesta = new Resultado();
            try
            {
                //Completar información del registro
                Empleado emp = new Empleado
                {
                    Id = empleado.Id,
                    Nombre = empleado.Nombre,
                    Cargo = empleado.Cargo,
                    Telefono = empleado.Telefono,
                    Contrato = empleado.Contrato
                };

                var identityId = new DEmpleado().CrearEmpleado(emp, ref identity);

                if (!string.IsNullOrEmpty(identity))
                {
                    if (identityId > 0)
                    {
                        respuesta.Mensaje = string.Format("Empleado creado exitosamente");
                        respuesta.Respuesta = 1;

                    }
                    else
                    {
                        respuesta.Mensaje = "No fue posible crear empleado";
                        respuesta.Respuesta = 0;

                    }
                }
                else
                {
                    respuesta.Mensaje = "No fue posible crear empleado";
                    respuesta.Respuesta = 0;

                }
            }
            catch (ApplicationException ex)
            {
                respuesta.Mensaje = "No fue posible crear empleado";
                respuesta.Respuesta = 0;

                throw ex.InnerException;
            }

            return respuesta;
        }

        public Resultado ModificarEmpleado(EmpleadoEntity empleado)
        {
            Resultado respuesta = new Resultado();

            try
            {
                //Actualización
                Empleado emp = new Empleado
                {
                    Id = empleado.Id,
                    Nombre = empleado.Nombre,
                    Cargo = empleado.Cargo,
                    Telefono = empleado.Telefono,
                    Contrato = empleado.Contrato
                };

                var result = new DEmpleado().ModificarEmpleado(emp);

                if (result == 1)
                {
                    respuesta.Mensaje = "Registro actualizado con éxito";
                    respuesta.Respuesta = 1;
                }
                else
                {
                    respuesta.Mensaje = "No fue posible actualizar el registro";
                    respuesta.Respuesta = 0;
                }
            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }

            return respuesta;
        }

        public Resultado EliminarEmpleado(EmpleadoEntity empleado)
        {
            Resultado respuesta = new Resultado();

            try
            {
                //Eliminación
                Empleado emp = new Empleado
                {
                    Id = empleado.Id,
                    Nombre = empleado.Nombre,
                    Cargo = empleado.Cargo,
                    Telefono = empleado.Telefono,
                    Contrato = empleado.Contrato
                };

                var result = new DEmpleado().EliminarEmpleado(emp);

                if (result == -1)
                {
                    respuesta.Mensaje = "Registro eliminado con éxito";
                    respuesta.Respuesta = 1;
                }
                else
                {
                    respuesta.Mensaje = "No fue posible eliminar el registro";
                    respuesta.Respuesta = 0;
                }
            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }

            return respuesta;
        }
    }
}
