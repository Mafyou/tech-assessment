namespace WeChooz.TechAssessment.Web.ParticipantSlice.Create;

[Route("_api/participant/create")]
public class ParticipantCreateEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<ParticipantCreateRequest>
    .WithActionResult<ParticipantCreateResponse>
{
    private readonly WeChoozContext _context = context;

    [HttpPost]
    public override async Task<ActionResult<ParticipantCreateResponse>> HandleAsync(ParticipantCreateRequest request, CancellationToken cancellationToken = default)
    {
        // Vérifier si la session existe
        var session = await _context.Sessions.FindAsync([request.SessionId], cancellationToken: cancellationToken);
        if (session is null)
        {
            return NotFound("Session non trouvée");
        }

        // Vérifier s'il reste des places
        var participantCount = await _context.Participants
            .Where(p => p.SessionId == request.SessionId)
            .CountAsync(cancellationToken);

        if (participantCount >= session.RemainingSeats)
        {
            return BadRequest("Plus de places disponibles pour cette session");
        }

        var participant = request.ToParticipantEntity();
        _context.Participants.Add(participant);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(ParticipantCreateResponse.FromEntity(participant));
    }
}