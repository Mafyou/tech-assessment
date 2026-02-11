namespace WeChooz.TechAssessment.Web.CourseSlice.Create;

public class CourseCreateRequest
{
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public required string Description { get; set; }
    public required uint DurationInDays { get; set; }
    public required Audience Audiance { get; set; }
    public required uint MaxAttendees { get; set; }
    public required Instructor Instructor { get; set; }
    public int? SessionId { get; set; }
    
    public static Course ToCourseEntity(CourseCreateRequest request)
    {
        return new Course
        {
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            Description = request.Description,
            DurationInDays = request.DurationInDays,
            Audiance = request.Audiance,
            MaxAttendees = request.MaxAttendees,
            Instructor = request.Instructor,
            SessionId = request.SessionId
        };
    }
}