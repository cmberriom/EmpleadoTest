using System.Web.Http.Cors;
using System.Web.Http;

namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web

            //var cors = new EnableCorsAttribute("*", "*", "*");//variable que indica de que sitios se hablita el cors
            var cors = new EnableCorsAttribute("*", "*", "*");//variable que indica de que sitios se hablita el cors
            config.EnableCors(cors);//funcion para habilitar el cors   

            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
