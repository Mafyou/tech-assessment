namespace WeChooz.TechAssessment.Web.ParticipantSlice.Create;

public class ParticipantCreateResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public int? SessionId { get; set; }

    public static ParticipantCreateResponse FromEntity(Participant participant)
    {
        return new ParticipantCreateResponse
        {
            Id = participant.Id,
            Name = participant.Name,
            Surname = participant.Surname,
            Email = participant.Email,
            Company = participant.Company,
            SessionId = participant.SessionId
        };
    }
}