using Common.Persistance;
using FluentValidation.Attributes;
using System.Collections.Generic;
using System.Linq;

namespace Zib.Models
{
    [Validator(typeof(VrednostValidator))]
    public class Vrednost : IEntity
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public int? VlasnikVrednostiId { get; set; }
        public int? OrganizacionaCelinaId { get; set; }
        public int? PoslovnaVrednostId { get; set; }
        public int VrstaVrednostiId { get; set; }

        public OrganizacionaCelina OrganizacionaCelina { get; set; }
        public PoslovnaVrednost PoslovnaVrednost { get; set; }
        public VlasnikVrednosti VlasnikVrednosti { get; set; }

        public bool Kriticna
        {
            get
            {
                //return ProcesServisBia_Vrednosti.Exists(psbv => psbv.ProcesServisBia != null && psbv.ProcesServisBia.Kritican == true);
                return ProcesServisBia_Vrednosti.Where(psbv => psbv.ProcesServisBia != null && psbv.ProcesServisBia.Kritican == true).Count() > 0;
            }
        }

            

        // za vise-vise prema ProcesServisBia
        public virtual List<ProcesServisBia_Vrednost> ProcesServisBia_Vrednosti { get; set; }
    }
}
