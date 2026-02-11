namespace WeChooz.TechAssessment.Infrastructure.Extensions;

public static class AddDbContextServicesExtension
{
    extension(IServiceCollection services)
    {
        public void AddDbContextServices(string connectionString)
        {
            services.AddDbContext<WeChoozContext>(options =>
                options.UseSqlServer(connectionString)
            );
        }
    }
}