using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class MereViewModel
    {
        public IEnumerable<Mera> Mere { get; set; }
        public IEnumerable<StatusMere> StatusMere { get; set; }
        public IEnumerable<ZaposleniViewModel> Zaposleni { get; set; }
    }
}
