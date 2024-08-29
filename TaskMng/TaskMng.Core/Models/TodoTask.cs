using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMng.Core.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; } // "To Do", "In Progress", "Done"

        [Required(ErrorMessage = "DueDate is required")]
        [FutureDate(ErrorMessage = "Due Date cannot be in the past.")]
        public DateTime? DueDate { get; set; }
    }

    public class FutureDateAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is DateTime dueDate)
            {
                return dueDate >= DateTime.Today;
            }
            return false;
        }
    }




}
