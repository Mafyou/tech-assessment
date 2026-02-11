namespace WeChooz.TechAssessment.Web.Transport;

public class ParticipantDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;

    public static ParticipantDto FromEntity(Participant participant)
    {
        return new ParticipantDto
        {
            Id = participant.Id,
            Name = participant.Name,
            Surname = participant.Surname,
            Email = participant.Email,
            Company = participant.Company
        };
    }
}