using Microsoft.Net.Http.Headers;

namespace WeChooz.TechAssessment.Web.Login;

public class LoginController : Controller
{
    [HttpGet]
    public ActionResult Handle()
    {
        Response.Headers[HeaderNames.CacheControl] = "no-cache, must-revalidate";
        return View();
    }
}