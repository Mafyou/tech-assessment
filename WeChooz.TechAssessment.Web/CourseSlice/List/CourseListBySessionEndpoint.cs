namespace WeChooz.TechAssessment.Web.CourseSlice.List;

[Route("_api/course/list-by-session")]
public class CourseListBySessionEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync
    .WithRequest<CourseListBySessionRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult> HandleAsync([FromQuery] CourseListBySessionRequest request, CancellationToken cancellationToken = default)
    {
        var courses = await _context.Courses
            .Where(c => c.SessionId == request.SessionId)
            .ToListAsync(cancellationToken);

        return Ok(courses);
    }
}