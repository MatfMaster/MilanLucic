using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class VrstaVrednostiTree 
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public int? NadredjenaKategorija { get; set; }
        public int? PoslovnaVrednostId { get; set; }
        public int? OrganizacionaCelinaId { get; set; }
        public IList<VrstaVrednostiTree> Children { get; set; }

        public virtual OrganizacionaCelina OrganizacionaCelina { get; set; }
        public virtual PoslovnaVrednost PoslovnaVrednost { get; set; }
        public virtual IList<VrsteVrednosti_PretnjeRanjivosti> VrsteVrednosti_PretnjeRanjivosti { get; set; }

        // Za potrebe tree view-a
        // Nivo u dubini stabla
        public int Nivo { get; set; }
        
        public bool Expanded { get; set; }
    }
}
