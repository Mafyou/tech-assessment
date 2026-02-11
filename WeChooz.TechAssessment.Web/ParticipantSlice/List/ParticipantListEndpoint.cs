namespace WeChooz.TechAssessment.Web.ParticipantSlice.List;

[Route("_api/participant/list")]
public class ParticipantListEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<ParticipantListRequest>
    .WithActionResult<IEnumerable<ParticipantListResponse>>
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult<IEnumerable<ParticipantListResponse>>> HandleAsync([FromQuery] ParticipantListRequest request, CancellationToken cancellationToken = default)
    {
        var participants = await _context.Participants!
            .Where(p => p.SessionId == request.SessionId)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var response = participants.Select(ParticipantListResponse.FromEntity);
        return Ok(response);
    }
}