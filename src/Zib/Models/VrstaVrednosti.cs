using Common.Persistance;
using FluentValidation.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Zib.Models
{
    [Validator(typeof(VrstaVrednostiValidator))]
    public class VrstaVrednosti : IEntity 
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required(ErrorMessage = "Naziv je obavezan")]
        public string Naziv { get; set; }

        [DataType(DataType.MultilineText)]
        public string Opis { get; set; }

        [Display(Name = "Nadredjena vrsta vrednosti")]
        //[NgSelect("nadredjeni", "id", "naziv", "id: {{item.id}} naziv: <span ng-bind-html=\"'' + item.naziv | highlight: $select.search\"></span>")]
        //[NgSelect("nadredjeni", "id", "naziv")]
        public int? NadredjenaKategorija { get; set; }

        [Display(Name = "Poslovna vrednost")]
        //[NgSelect("poslovneVrednosti", "id", "vrednost")]
        public int? PoslovnaVrednostId { get; set; }

        //[NgSelect("organizacioneCeline", "id", "naziv")]
        [Display(Name = "Organizaciona celina")]
        public int? OrganizacionaCelinaId { get; set; }

        public IList<VrstaVrednosti> Children { get; set; }

        public virtual OrganizacionaCelina OrganizacionaCelina { get; set; }
        public virtual PoslovnaVrednost PoslovnaVrednost { get; set; }

        public List<VrsteVrednosti_PretnjeRanjivosti> VrsteVrednosti_PretnjeRanjivosti { get; set; }

        public VrstaVrednosti()
        {
            VrsteVrednosti_PretnjeRanjivosti = new List<VrsteVrednosti_PretnjeRanjivosti>();
        }
    }
}
