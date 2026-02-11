namespace WeChooz.TechAssessment.Infrastructure.Entities;

public class Session
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string ShortDescription { get; set; }
    public required Audience Audience { get; set; }
    public required DateTime StartDate { get; set; }
    public required uint DurationInDays { get; set; }
    public required Delivrance Delivrance { get; set; }
    public required int RemainingSeats { get; set; } // Might be negative if overbooked

    // Navigation properties
    public ICollection<Course> Courses { get; set; } = [];
    public ICollection<Participant> Participants { get; set; } = [];
}