using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class ProcesiServisiBiaViewModel
    {
        public IEnumerable<ProcesServisBia> ProcesiServisiBia { get; set; }
        public IEnumerable<VrednostViewModel> Resursi { get; set; }
        public IEnumerable<ZaposleniBiaViewModel> Ljudi { get; set; }
        public IEnumerable<DobavljaciSelect> Dobavljaci { get; set; }
    }
}
