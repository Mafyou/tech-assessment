namespace WeChooz.TechAssessment.Web.SessionSlice.Create;

[Route("_api/session/create")]
public class SessionCreateEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<SessionCreateRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpPost]
    public override async Task<ActionResult> HandleAsync(SessionCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (request.StartDate < DateTime.UtcNow)
        {
            return BadRequest("Start date cannot be in the past.");
        }
        var session = request.ToSessionEntity();
        _context.Sessions.Add(session);
        await _context.SaveChangesAsync(cancellationToken);
        return Ok(session);
    }
}