namespace WeChooz.TechAssessment.Web.SessionSlice.Read;

[Route("_api/session/read")]
public class SessionReadEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<SessionReadRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult> HandleAsync(SessionReadRequest request, CancellationToken cancellationToken = default)
    {
        var session = await _context.Sessions
            .Include(p => p.Participants)
            .Include(c => c.Courses)
            .ThenInclude(i => i.Instructor)
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        if (session is null)
        {
            return NotFound();
        }
        return Ok(session);
    }
}