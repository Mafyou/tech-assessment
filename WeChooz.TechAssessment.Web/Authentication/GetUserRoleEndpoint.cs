namespace WeChooz.TechAssessment.Web.Authentication;

[Route("_api/admin/role")]
public class GetUserRoleEndpoint : Ardalis.ApiEndpoints.EndpointBaseAsync.WithoutRequest.WithActionResult<GetUserRoleResponse>
{
    [HttpGet]
    public override async Task<ActionResult<GetUserRoleResponse>> HandleAsync(CancellationToken cancellationToken = default)
    {
        if (!User.Identity?.IsAuthenticated ?? true)
        {
            return Unauthorized();
        }

        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "";
        var username = User.FindFirst(ClaimTypes.Name)?.Value ?? "";

        return Ok(new GetUserRoleResponse
        {
            Role = role,
            Username = username
        });
    }
}