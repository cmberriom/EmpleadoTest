using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Entities
{
    public class ListEmpleados : Resultado
    {
        [DataMember(Order = 3)]
        public List<EmpleadoEntity> ListaEmpleados { get; set; }
    }
}
