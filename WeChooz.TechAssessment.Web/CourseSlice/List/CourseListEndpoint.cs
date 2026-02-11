namespace WeChooz.TechAssessment.Web.CourseSlice.List;

[Route("_api/course/list")]
public class CourseListEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithoutRequest
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpGet]
    public override async Task<ActionResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var courses = await _context.Courses
            .Include(i => i.Instructor)
            .ToListAsync(cancellationToken);
        if (courses is null || courses.Count == 0)
        {
            return NotFound();
        }
        return Ok(courses);
    }
}