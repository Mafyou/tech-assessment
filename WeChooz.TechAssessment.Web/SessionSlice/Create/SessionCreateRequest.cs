namespace WeChooz.TechAssessment.Web.SessionSlice.Create;

public class SessionCreateRequest
{
    [JsonPropertyName("shortDescription")]
    public required string ShortDescription { get; set; }
    [JsonPropertyName("audience")]
    public required Audience Audience { get; set; }
    [JsonPropertyName("startDate")]
    public required DateTime StartDate { get; set; }
    [JsonPropertyName("durationInDays")]
    public required uint DurationInDays { get; set; }
    [JsonPropertyName("delivrance")]
    public required Delivrance Delivrance { get; set; }
    [JsonPropertyName("remainingSeats")]
    public required int RemainingSeats { get; set; }

    // Navigation properties
    public ICollection<Course> Courses { get; set; } = [];
    public ICollection<Participant> Participants { get; set; } = [];
    public Session ToSessionEntity()
    {
        return new Session
        {
            ShortDescription = ShortDescription,
            Audience = Audience,
            StartDate = StartDate,
            DurationInDays = DurationInDays,
            Delivrance = Delivrance,
            RemainingSeats = RemainingSeats,
            Courses = Courses,
            Participants = Participants
        };
    }
}