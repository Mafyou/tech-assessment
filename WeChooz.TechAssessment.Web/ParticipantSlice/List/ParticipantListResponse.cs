namespace WeChooz.TechAssessment.Web.ParticipantSlice.List;

public class ParticipantListResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public int? SessionId { get; set; }

    public static ParticipantListResponse FromEntity(Participant participant)
    {
        return new ParticipantListResponse
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