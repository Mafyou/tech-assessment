namespace WeChooz.TechAssessment.Web.ParticipantSlice.List;

public class ParticipantListRequest
{
    [JsonPropertyName("sessionId")]
    public required int SessionId { get; set; }
}