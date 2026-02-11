namespace WeChooz.TechAssessment.Infrastructure.Context;

public class WeChoozDbContextFactory : IDesignTimeDbContextFactory<WeChoozContext>
{
    public WeChoozContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<WeChoozContext>();
        optionsBuilder.UseSqlServer(
            "Data Source=localhost,5678;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=yourStrong(!)Password;Pooling=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Command Timeout=0;"
        );
        return new WeChoozContext(optionsBuilder.Options);
    }
}