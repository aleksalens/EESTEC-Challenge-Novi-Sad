using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace MichTeachBackend.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }    

        public string Title { get; set; }  

        public int CourseId { get; set; }

        [ValidateNever]
        public Course Course { get; set; }
    }
}
