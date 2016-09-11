using Common.Persistance;
using System.ComponentModel.DataAnnotations;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(VrstaPretnjeValidator))]
    public class VrstaPretnje : IEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Opis je obavezan")]
        [MaxLength(50, ErrorMessage = "Maksimalna dužina je {0}")]
        public string Opis { get; set; }
    }
}
