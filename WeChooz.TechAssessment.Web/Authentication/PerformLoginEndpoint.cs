namespace WeChooz.TechAssessment.Web.Authentication;

[Route("_api/admin/login")]
public class PerformLoginEndpoint : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<PerformLoginRequest>
    .WithActionResult
{
    [HttpPost]
    public override async Task<ActionResult> HandleAsync(PerformLoginRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Login))
        {
            return BadRequest("Login cannot be empty.");
        }
        if (request.Login == "sales" || request.Login == "formation")
        {
            var principal = new ClaimsPrincipal([new ClaimsIdentity([new Claim(ClaimTypes.Role, request.Login), new Claim(ClaimTypes.Name, request.Login)], "Cookie")]);
            await HttpContext.SignInAsync(principal);
            return Ok(principal.Claims.Select(c => new { c.Type, c.Value }));
        }
        return Unauthorized();
    }
}
