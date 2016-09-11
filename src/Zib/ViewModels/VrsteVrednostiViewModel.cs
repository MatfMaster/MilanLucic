using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class VrsteVrednostiViewModel
    {
        public IList<PoslovnaVrednost> PoslovneVrednosti { get; set; }
        public IList<OrganizacionaCelina> OrganizacioneCeline { get; set; }
        public IList<VrstaVrednostiTree> VrsteVrednostiHijerarhija { get; set; }
        /// <summary>
        /// Potrebno za ui-select za izbor nadredjene VrsteVrednosti
        /// </summary>
        public IList<VrstaVrednostiForSelect> NadredjeniSelect { get; set; }

    }
}
