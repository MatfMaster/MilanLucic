using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class VlasniciVrednostiViewModel
    {
        public IEnumerable<VlasnikVrednosti> VlasniciVrednosti { get; set; }
        public IEnumerable<OrganizacionaCelina> OrganizacioneCeline { get; set; }
    }
}
