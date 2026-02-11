namespace WeChooz.TechAssessment.Web.Transport;

public class CourseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public InstructorDto? Instructor { get; set; }

    public static CourseDto FromEntity(Course course)
    {
        return new CourseDto
        {
            Id = course.Id,
            Title = course.Title,
            ShortDescription = course.ShortDescription,
            Instructor = course.Instructor != null ? InstructorDto.FromEntity(course.Instructor) : null
        };
    }
}