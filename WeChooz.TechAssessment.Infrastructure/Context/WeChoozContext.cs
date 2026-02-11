namespace WeChooz.TechAssessment.Infrastructure.Context;

public class WeChoozContext(DbContextOptions<WeChoozContext> options) : DbContext(options)
{
    public DbSet<Course> Courses { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Participant>? Participants { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure Session -> Courses relationship (One-to-Many)
        modelBuilder.Entity<Session>()
            .HasMany(s => s.Courses)
            .WithOne(c => c.Session)
            .HasForeignKey(c => c.SessionId)
            .OnDelete(DeleteBehavior.SetNull);

        // Configure Session -> Participants relationship (One-to-Many)
        modelBuilder.Entity<Session>()
            .HasMany(s => s.Participants)
            .WithOne(p => p.Session)
            .HasForeignKey(p => p.SessionId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}