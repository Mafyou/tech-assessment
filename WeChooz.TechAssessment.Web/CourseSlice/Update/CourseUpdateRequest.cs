namespace WeChooz.TechAssessment.Web.CourseSlice.Update;

public class CourseUpdateRequest
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public required string Description { get; set; }
    public required uint DurationInDays { get; set; }
    public required Audience Audiance { get; set; }
    public required uint MaxAttendees { get; set; }
    public required Instructor Instructor { get; set; }
}