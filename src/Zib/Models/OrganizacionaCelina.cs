using Common.Persistance;
using System.ComponentModel.DataAnnotations;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(OrganizacionaCelinaValidator))]
    public class OrganizacionaCelina : IEntity
    {
        public int Id { get; set; }

        [Required]
        public string Naziv { get; set; }

    }
}
