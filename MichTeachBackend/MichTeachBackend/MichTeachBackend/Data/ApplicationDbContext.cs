using MichTeachBackend.Models;
using Microsoft.EntityFrameworkCore;
namespace MichTeachBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {
           
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }

        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure User - Course relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.Courses)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade); // or your preferred delete behavior

            // Configure Course - Question relationship
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Questions)
                .WithOne(q => q.Course)
                .HasForeignKey(q => q.CourseId)
                .OnDelete(DeleteBehavior.Cascade); // or your preferred delete behavior

            // Optionally, you can configure other relationships or entity properties here
        }
    }
}
