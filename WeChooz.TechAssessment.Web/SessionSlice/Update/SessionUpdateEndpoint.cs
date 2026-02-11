namespace WeChooz.TechAssessment.Web.SessionSlice.Update;

[Route("_api/session/update")]
public class SessionUpdateEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<SessionUpdateRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpPut]
    public override async Task<ActionResult> HandleAsync(SessionUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var session = await _context.Sessions.FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
        if (session is null)
        {
            return NotFound();
        }
        if (session.StartDate < DateTime.UtcNow)
        {
            return BadRequest("Cannot update a session that has already started.");
        }

        session.ShortDescription = request.ShortDescription;
        session.Audience = request.Audience;
        session.StartDate = request.StartDate;
        session.DurationInDays = request.DurationInDays;
        session.Delivrance = request.Delivrance;
        session.RemainingSeats = request.RemainingSeats;

        await _context.SaveChangesAsync(cancellationToken);
        return Ok(session);
    }
}
