namespace WeChooz.TechAssessment.Web.SessionSlice.List;

[Route("_api/session/list")]
public class SessionListEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithoutRequest
    .WithActionResult<IEnumerable<SessionListResponse>>
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult<IEnumerable<SessionListResponse>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var sessions = await _context.Sessions
            .Include(p => p.Participants)
            .Include(c => c.Courses)
            .ThenInclude(i => i.Instructor)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
        
        if (sessions is null || sessions.Count == 0)
        {
            return NotFound();
        }
        
        var response = sessions.Select(SessionListResponse.FromEntity);
        return Ok(response);
    }
}