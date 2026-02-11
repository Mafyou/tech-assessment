namespace WeChooz.TechAssessment.Web.ParticipantSlice.Create;

public class ParticipantCreateRequest
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("surname")]
    public required string Surname { get; set; }

    [JsonPropertyName("email")]
    public required string Email { get; set; }

    [JsonPropertyName("company")]
    public required string Company { get; set; }

    [JsonPropertyName("sessionId")]
    public required int SessionId { get; set; }

    public Participant ToParticipantEntity()
    {
        return new Participant
        {
            Name = Name,
            Surname = Surname,
            Email = Email,
            Company = Company,
            SessionId = SessionId
        };
    }
}