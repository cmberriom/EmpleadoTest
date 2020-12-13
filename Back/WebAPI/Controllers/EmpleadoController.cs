using Business;
using Entities;
using System;
using System.Web.Http;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Empleado")]
    public class EmpleadoController : ApiController
    {
        [HttpPost]
        [Route("ObtenerEmpleados")]
        public IHttpActionResult ObtenerEmpleados()
        {
            try
            {
                Resultado resultado = new BEmpleado().ObtenerEmpleados();

                return Ok(resultado);
            }
            catch (ApplicationException)
            {
                string errorMessage = "Error durante la consulta. Por favor, intente nuevamente.";
                Resultado resultado = new Resultado() { Respuesta = 0, Mensaje = Convert.ToString(errorMessage) };
                return Ok(resultado);
            }
        }

        [HttpPost]
        [Route("CrearEmpleado")]
        public IHttpActionResult CrearEmpleado(EmpleadoEntity empleado)
        {
            try
            {
                string identity = string.Empty;
                var creacion = new BEmpleado().CrearEmpleado(empleado, ref identity);
                return Ok(creacion);
            }
            catch (ApplicationException)
            {
                string errorMessage = "Error durante la creación del registro. Por favor, intente nuevamente.";
                Resultado resultado = new Resultado() { Respuesta = 0, Mensaje = Convert.ToString(errorMessage) };
                return Ok(resultado);
            }

        }

        [HttpPost]
        [Route("ModificarEmpleado")]
        public IHttpActionResult ModificarEmpleado(EmpleadoEntity empleado)
        {
            try
            {
                string identity = string.Empty;
                var creacion = new BEmpleado().ModificarEmpleado(empleado);
                return Ok(creacion);
            }
            catch (ApplicationException)
            {
                string errorMessage = "Error durante la creación del registro. Por favor, intente nuevamente.";
                Resultado resultado = new Resultado() { Respuesta = 0, Mensaje = Convert.ToString(errorMessage) };
                return Ok(resultado);
            }

        }

        [HttpPost]
        [Route("EliminarEmpleado")]
        public IHttpActionResult EliminarEmpleado(EmpleadoEntity empleado)
        {
            try
            {
                string identity = string.Empty;
                var creacion = new BEmpleado().EliminarEmpleado(empleado);
                return Ok(creacion);
            }
            catch (ApplicationException)
            {
                string errorMessage = "Error durante la eliminación del registro. Por favor, intente nuevamente.";
                Resultado resultado = new Resultado() { Respuesta = 0, Mensaje = Convert.ToString(errorMessage) };
                return Ok(resultado);
            }

        }
    }
}