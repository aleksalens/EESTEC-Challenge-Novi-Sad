using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace MichTeachBackend.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }
        [ValidateNever]
        public User User { get; set; }

        [ValidateNever]
        public List<Question> Questions { get; set; }
    }
}
