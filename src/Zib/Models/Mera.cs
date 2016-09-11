using System;
using System.ComponentModel.DataAnnotations;
using Common.Persistance;
using System.Collections.Generic;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(Mera))]
    public class Mera : IEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public string Naziv { get; set; }

        public bool Aktivna { get; set; }

        [StringLength(64)]
        public string Oznaka { get; set; }

        public bool Grupna { get; set; }

        public int? ZaduzenZaImplementaciju { get; set; }

        public DateTime? RokZaImplementaciju { get; set; }

        public int? StatusMereId { get; set; }

        public StatusMere StatusMere { get; set; }

        public Zaposleni ZaposleniZaduzenZaImplementaciju { get; set; }

        //public VrstaMere VrstaMere { get; set; }
        public IList<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere> VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere { get; set; }

        public virtual List<PretnjeRanjivosti_DefaultMere> PretnjeRanjivosti_DefaultMere { get; set; }
    }


}
