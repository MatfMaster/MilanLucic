using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Common.Persistance;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(VrstaMereValidator))]
    public class VrstaMere :IEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        [Required]
        public string Naziv { get; set; }

        public IList<Mera> Mere { get; set; }
    }

   
}
