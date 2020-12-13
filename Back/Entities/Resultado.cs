using System.Runtime.Serialization;

namespace Entities
{
    [DataContract]
    public class Resultado
    {
        [DataMember(Order = 1)]
        public int Respuesta { get; set; }

        [DataMember(Order = 2)]
        public string Mensaje { get; set; }
    }
}
