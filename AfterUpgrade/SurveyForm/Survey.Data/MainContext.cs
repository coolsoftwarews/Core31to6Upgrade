using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Survey.Core.Domain.Questionaire;

namespace Survey.Data
{
    public class MainContext : DbContext
    {
        private IConfiguration _configuration;

     
        public MainContext(
         )
        {
        }

        public DbSet<MainForm> MainForms { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Venue> Venues { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=SurveyAppDB";

            optionsBuilder.UseSqlServer(connection);
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Answer>()
            .HasOne(p => p.MainForm)
            .WithMany(p => p.Answers)
            .HasForeignKey(x => x.UserId);

            modelBuilder.Entity<MainForm>()
                .HasOne(x => x.Venue)
                .WithMany()
                .HasForeignKey(x => x.VenueId);

            modelBuilder.Entity<Venue>().HasData(
           new Venue { Id = 1, Name = "Claremont Shopping Mall" }
           );

           modelBuilder.Entity<Question>().HasData(
            new Question { Id = 1, Name = "Do you like apples?", IsActive = true },
            new Question { Id = 2, Name = "Do you drink coffee?", IsActive = true },
            new Question { Id = 3, Name = "Do you drink water?", IsActive = true },
            new Question { Id = 4, Name = "Do you eat pizza?", IsActive = true },
            new Question { Id = 5, Name = "Do you have yacht?", IsActive = true },
            new Question { Id = 6, Name = "Do you swim?", IsActive = true }
            );
        }
    }
}