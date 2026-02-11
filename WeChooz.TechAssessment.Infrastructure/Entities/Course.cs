namespace WeChooz.TechAssessment.Infrastructure.Entities;

public class Course
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string ShortDescription { get; set; }
    public required string Description { get; set; }
    public required uint DurationInDays { get; set; }
    public required Audience Audiance { get; set; }
    public required uint MaxAttendees { get; set; }
    public required Instructor Instructor { get; set; }

    // A course can have multiple sessions, but a session belongs to only one course
    public int? SessionId { get; set; }

    // Navigation property
    public Session? Session { get; set; }
}