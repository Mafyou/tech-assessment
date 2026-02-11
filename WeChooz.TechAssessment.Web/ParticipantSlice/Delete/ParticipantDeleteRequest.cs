namespace WeChooz.TechAssessment.Web.ParticipantSlice.Delete;

public class ParticipantDeleteRequest
{
    [JsonPropertyName("id")]
    public required int Id { get; set; }
}