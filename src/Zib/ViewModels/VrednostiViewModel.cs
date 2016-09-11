using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class VrednostiViewModel
    {
        public IList<VrstaVrednostiForSelect> VrsteVrednosti { get; set; }
        public IList<VrstaVrednostiTree> VrsteVrednostiHijerarhija { get; set; }
        public IEnumerable<PoslovnaVrednost> PoslovneVrednosti { get; set; }
        public IEnumerable<OrganizacionaCelina> OrganizacioneCeline { get; set; }
        public IList<VlasnikVrednostiForSelect> VlasniciVrednosti { get; set; }

    }
}
