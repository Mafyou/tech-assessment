namespace WeChooz.TechAssessment.Web.SessionSlice.Update;

public class SessionUpdateRequest
{
    public required int Id { get; set; }
    public required string ShortDescription { get; set; }
    public required Audience Audience { get; set; }
    public required DateTime StartDate { get; set; }
    public required uint DurationInDays { get; set; }
    public required Delivrance Delivrance { get; set; }
    public required int RemainingSeats { get; set; }
}
