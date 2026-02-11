namespace WeChooz.TechAssessment.Web.CourseSlice.Read;

[Route("_api/course/read")]
public class CourseReadEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<CourseReadRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult> HandleAsync(CourseReadRequest request, CancellationToken cancellationToken = default)
    {
        var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        if (course is null)
        {
            return NotFound();
        }
        return Ok(course);
    }
}