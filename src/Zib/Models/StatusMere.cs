using System.ComponentModel.DataAnnotations;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(StatusMereValidator))]
    public class StatusMere
    {
        public int Id { get; set; }

        [Required]
        [StringLength(64)]
        public string Status { get; set; }
    }
}