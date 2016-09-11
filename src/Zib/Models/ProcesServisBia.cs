using Common.Persistance;
using System.Collections.Generic;

namespace Zib.Models
{
    public class ProcesServisBia : IEntity
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public bool Kritican{ get; set; }
        public bool MogucnostRucnogObavljanja { get; set; }
        public bool FinansijskiGubitak { get; set; }
        public decimal FinansijskiGubitakIznos { get; set; }
        public bool ReputacioniGubitak { get; set; }
        public decimal ReputacioniGubitakIznos { get; set; }
        public bool ZakonskaObaveza { get; set; }
        public decimal ZakonskaObavezaIznos { get; set; }
        public bool UgovornaObaveza { get; set; }
        public decimal UgovornaObavezaIznos { get; set; }
        public bool NeiskoriscenaPrilika { get; set; }
        public decimal NeiskoriscenaPrilikaIznos { get; set; }
        public int Rto { get; set; }
        public int Rpo { get; set; }
        public string CiljaniNivoOporavka { get; set; }

        // za vise-vise prema Zaposlenima
        public List<ProcesServisBia_Zaposleni> Zaposleni { get; set; }
        public List<ProcesServisBia_Vrednost> Resursi { get; set; }
        public List<ProcesServisBia_Dobavljac> Dobavljaci { get; set; }

    }
}
