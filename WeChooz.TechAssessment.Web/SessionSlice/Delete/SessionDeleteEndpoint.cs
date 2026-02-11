namespace WeChooz.TechAssessment.Web.SessionSlice.Delete;

[Route("_api/session/delete")]
public class SessionDeleteEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<SessionDeleteRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpDelete]
    public override async Task<ActionResult> HandleAsync(SessionDeleteRequest request, CancellationToken cancellationToken = default)
    {
        var session = await _context.Sessions.FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
        if (session is null)
        {
            return NotFound();
        }

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}