using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class PretnjeViewModel
    {

        //public IEnumerable<Pretnja> Pretnje { get; set; }
        //public IEnumerable<Ng2Select> VrstePretnji { get; set; }
        public int Id { get; set; }
        public string Naziv { get; set; }

        public bool? Poverljivost { get; set; }
        public bool? Integritet { get; set; }
        public bool? Raspolozivost { get; set; }
        public int VrstaPretnjeId { get; set; }
        public virtual VrstaPretnje VrstaPretnje { get; set; }

    }
}
