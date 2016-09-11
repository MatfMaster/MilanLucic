using Common.Persistance;
using System.Collections.Generic;

namespace Zib.Models
{
    public class Zaposleni: IEntity
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Telefon { get; set; }
        public string Mesto { get; set; }
        public string Adresa { get; set; }
        public string Email { get; set; }
        public int OrganizacionaCelinaId { get; set; }

        public OrganizacionaCelina OrganizacionaCelina { get; set; }
        // za vise-vise prema ProcesServisBia
        public List<ProcesServisBia_Zaposleni> ProcesServisBia_Zaposleni { get; set; }
    }
}
