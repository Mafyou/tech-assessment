namespace WeChooz.TechAssessment.Web.CourseSlice.Update;

[Route("_api/course/update")]
public class UpdateCourseEndpoint(WeChoozContext context) : Ardalis.ApiEndpoints.EndpointBaseAsync.WithRequest<CourseUpdateRequest>
        .WithActionResult
{
    private readonly WeChoozContext _context = context;

    [HttpPatch]
    public override async Task<ActionResult> HandleAsync(CourseUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var course = await _context.Courses
        .Include(c => c.Instructor)
        .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (course is null)
            return NotFound();

        // Mise à jour des propriétés
        course.Title = request.Title;
        course.ShortDescription = request.ShortDescription;
        course.Description = request.Description;
        course.DurationInDays = request.DurationInDays;
        course.Audiance = request.Audiance;
        course.MaxAttendees = request.MaxAttendees;
        course.Instructor = request.Instructor;

        await _context.SaveChangesAsync(cancellationToken);

        return Ok(course);
    }
}