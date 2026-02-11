namespace WeChooz.TechAssessment.Infrastructure.ValueObjets;

public sealed record Instructor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
}