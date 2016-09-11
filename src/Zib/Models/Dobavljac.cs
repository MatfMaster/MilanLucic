using Common.Persistance;
using FluentValidation.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Zib.Models
{
    [Validator(typeof(DobavljacValidator))]
    public class Dobavljac : IEntity
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Naziv { get; set; }

        [MaxLength(200)]
        public string Adresa { get; set; }

        [MaxLength(100)]
        public string Mesto { get; set; }

        [MaxLength(200)]
        public string Telefon { get; set; }

        [MaxLength(200)]
        public string KontaktOsoba { get; set; }

        [MaxLength(255)]
        public string Email { get; set; }

        // za vise-vise prema ProcesServisBia
        public List<ProcesServisBia_Dobavljac> ProcesServisBia_Dobavljac { get; set; }
    }
}
