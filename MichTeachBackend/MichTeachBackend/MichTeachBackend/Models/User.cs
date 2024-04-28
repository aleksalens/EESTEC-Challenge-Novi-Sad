using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace MichTeachBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } 
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        [ValidateNever]
        public List<Course> Courses { get; set; }
    }
}
