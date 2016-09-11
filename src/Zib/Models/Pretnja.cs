using Common.Persistance;
using FluentValidation.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Zib.Models
{
    [Validator(typeof(PretnjaValidator))]
    public class Pretnja : IEntity
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        [Display(Name = "Naziv pretnje")]        
        public string Naziv { get; set; }

        public bool? Poverljivost { get; set; }
        public bool? Integritet { get; set; }
        public bool? Raspolozivost { get; set; }

        //[Required]
        [Display(Name = "Vrsta pretnje")]
        //[NgSelect("vrstePretnji", "id", "opis")]
        public int VrstaPretnjeId { get; set; }

        public virtual VrstaPretnje VrstaPretnje { get; set; }

        // Vise prema vise za ranjivosti
        public List<PretnjeRanjivosti> PretnjeRanjivosti { get; set; }

        public Pretnja()
        {
            PretnjeRanjivosti = new List<PretnjeRanjivosti>();
        }
    }

}