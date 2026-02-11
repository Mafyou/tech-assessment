namespace WeChooz.TechAssessment.Infrastructure.Context;

public static class DbSeeder
{
    public static async Task SeedAsync(WeChoozContext context)
    {
        // Check if data already exists
        if (context.Sessions.Any())
        {
            return; // Database has been seeded
        }

        var random = new Random();
        var audiences = Enum.GetValues<Audience>().Cast<Audience>().ToArray();
        var delivrances = Enum.GetValues<Delivrance>().Cast<Delivrance>().ToArray();

        // Générer 10 instructeurs fictifs
        var instructors = Enumerable.Range(1, 10).Select(i => new Instructor
        {
            Name = $"Instructor{i}",
            Surname = $"Surname{i}"
        }).ToList();

        // Générer 10 participants fictifs
        var participants = Enumerable.Range(1, 10).Select(i => new Participant
        {
            Name = $"Participant{i}",
            Surname = $"Surname{i}",
            Email = $"participant{i}@test.com",
            Company = $"Company{i}"
        }).ToList();

        // Générer 10 sessions
        var sessions = new List<Session>();
        for (int i = 1; i <= 10; i++)
        {
            var session = new Session
            {
                ShortDescription = $"Session {i}",
                Audience = audiences[random.Next(audiences.Length)],
                StartDate = DateTime.UtcNow.AddDays(random.Next(1, 100)),
                DurationInDays = (uint)random.Next(1, 10),
                Delivrance = (Delivrance)random.Next(Enum.GetValues<Delivrance>().Length),
                RemainingSeats = random.Next(5, 20),
                Courses = [],
                Participants = []
            };

            // Générer 2 ou 3 cours pour chaque session
            int nbCourses = random.Next(2, 4);
            for (int j = 1; j <= nbCourses; j++)
            {
                var course = new Course
                {
                    Title = $"Course {i}-{j}",
                    ShortDescription = $"Short desc {i}-{j}",
                    Description = $"Description for course {i}-{j}",
                    DurationInDays = (uint)random.Next(1, 5),
                    Audiance = audiences[random.Next(audiences.Length)],
                    MaxAttendees = (uint)random.Next(5, 20),
                    Instructor = instructors[random.Next(instructors.Count)]
                };
                session.Courses.Add(course);
            }
            sessions.Add(session);
        }

        // Répartir aléatoirement les participants dans les sessions
        foreach (var participant in participants)
        {
            var session = sessions[random.Next(sessions.Count)];
            participant.Session = session;
            session.Participants.Add(participant);
        }

        // Ajout à la base
        await context.Sessions.AddRangeAsync(sessions);
        await context.Participants!.AddRangeAsync(participants);
        await context.SaveChangesAsync();
    }
}