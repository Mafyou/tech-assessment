namespace WeChooz.TechAssessment.Web.CourseSlice;

[Route("_api/course/delete")]
public class CourseDeleteEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<CourseDeleteRequest>
    .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpDelete]
    public override async Task<ActionResult> HandleAsync(CourseDeleteRequest request, CancellationToken cancellationToken = default)
    {
        var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        if (course is null)
        {
            return NotFound();
        }
        _context.Courses.Remove(course);
        await _context.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}