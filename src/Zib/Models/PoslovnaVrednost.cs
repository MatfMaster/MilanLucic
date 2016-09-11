using System.ComponentModel.DataAnnotations;
using Common.Persistance;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(PoslovnaVrednostValidator))]
    public class PoslovnaVrednost :IEntity
    {
        public int Id { get; set; }
        [Required]
        public int Vrednost { get; set; }
    }
}
