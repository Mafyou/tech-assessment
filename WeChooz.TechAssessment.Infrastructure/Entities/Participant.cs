namespace WeChooz.TechAssessment.Infrastructure.Entities;

public class Participant
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;

    // A participant can be enrolled in only one session, but a session can have multiple participants
    public int? SessionId { get; set; }

    // Navigation property
    public Session? Session { get; set; }
}