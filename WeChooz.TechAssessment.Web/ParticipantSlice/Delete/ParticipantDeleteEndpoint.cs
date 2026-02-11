namespace WeChooz.TechAssessment.Web.ParticipantSlice.Delete;

[Route("_api/participant/delete")]
public class ParticipantDeleteEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<ParticipantDeleteRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpDelete]
    public override async Task<ActionResult> HandleAsync(ParticipantDeleteRequest request, CancellationToken cancellationToken = default)
    {
        var participant = await _context.Participants!.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
        if (participant is null)
        {
            return NotFound("Participant non trouvé");
        }

        _context.Participants!.Remove(participant);
        await _context.SaveChangesAsync(cancellationToken);
        return Ok();
    }
}
