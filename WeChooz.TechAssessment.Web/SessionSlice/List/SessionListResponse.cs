namespace WeChooz.TechAssessment.Web.SessionSlice.List;

public class SessionListResponse
{
    public int Id { get; set; }
    public string ShortDescription { get; set; } = string.Empty;
    public Audience Audience { get; set; }
    public DateTime StartDate { get; set; }
    public uint DurationInDays { get; set; }
    public Delivrance Delivrance { get; set; }
    public int RemainingSeats { get; set; }
    public List<ParticipantDto> Participants { get; set; } = [];
    public List<CourseDto> Courses { get; set; } = [];

    public static SessionListResponse FromEntity(Session session)
    {
        return new SessionListResponse
        {
            Id = session.Id,
            ShortDescription = session.ShortDescription,
            Audience = session.Audience,
            StartDate = session.StartDate,
            DurationInDays = session.DurationInDays,
            Delivrance = session.Delivrance,
            RemainingSeats = session.RemainingSeats,
            Participants = session.Participants?.Select(ParticipantDto.FromEntity).ToList() ?? [],
            Courses = session.Courses?.Select(CourseDto.FromEntity).ToList() ?? []
        };
    }
}