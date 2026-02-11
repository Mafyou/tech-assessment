namespace WeChooz.TechAssessment.Web.CourseSlice.Create;

[Route("_api/course/create")]
public class CreateCourseEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<CourseCreateRequest>
        .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpPost]
    public override async Task<ActionResult> HandleAsync(CourseCreateRequest request, CancellationToken cancellationToken = default)
    {
        var course = CourseCreateRequest.ToCourseEntity(request);
        _context.Courses.Add(course);
        await _context.SaveChangesAsync(cancellationToken);
        return Ok(course);
    }
}