namespace WeChooz.TechAssessment.Web.Transport;

public class InstructorDto
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;

    public static InstructorDto FromEntity(Instructor instructor)
    {
        return new InstructorDto
        {
            Name = instructor.Name,
            Surname = instructor.Surname
        };
    }
}