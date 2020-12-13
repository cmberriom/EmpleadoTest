using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DEmpleado
    {
        public List<Empleado> ObtenerEmpleados()
        {
            try
            {
                using (var ctx = new mainEntities())
                {
                    var request = from table in ctx.Empleado select table;

                    List<Empleado> result = request.ToList();

                    return result;
                }

            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }
        }

        public long CrearEmpleado(Empleado empleado, ref string identity)
        {
            try
            {
                using (var ctx = new mainEntities())
                {
                    ctx.Empleado.Add(empleado);
                    ctx.SaveChanges();
                    var id = empleado.Id;

                    if (id > 0)
                    {
                        identity = id.ToString();
                    }

                    return empleado.Id;
                }
            }
            catch (ApplicationException ex)
            {
                identity = string.Empty;
                throw ex.InnerException;
            }
        }

        public long ModificarEmpleado(Empleado empleado)
        {
            int result = -1;
            try
            {

                using (var ctx = new mainEntities())
                {
                    var update = ctx.Empleado.FirstOrDefault(x => x.Id == empleado.Id);

                    if (update != null)
                    {
                        update.Nombre = empleado.Nombre;
                        update.Cargo = empleado.Cargo;
                        update.Telefono = empleado.Telefono;
                        update.Contrato = empleado.Contrato;
                        result = ctx.SaveChanges();
                    }
                }
            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }
            return result;
        }

        public long EliminarEmpleado(Empleado empleado)
        {
            int result = -1;
            try
            {
                using (var ctx = new mainEntities())
                {
                    var delete = ctx.Empleado.FirstOrDefault(x => x.Id == empleado.Id);
                    ctx.Empleado.Remove(delete);
                    ctx.SaveChanges();

                }
            }
            catch (ApplicationException ex)
            {
                throw ex.InnerException;
            }
            return result;
        }

    }
}
