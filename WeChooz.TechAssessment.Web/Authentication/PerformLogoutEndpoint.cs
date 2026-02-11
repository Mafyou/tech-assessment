namespace WeChooz.TechAssessment.Web.Authentication;

[Route("_api/admin/logout")]
public class PerformLogoutEndpoint : Ardalis.ApiEndpoints.EndpointBaseAsync.WithoutRequest.WithActionResult
{
    [HttpPost]
    public override async Task<ActionResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}