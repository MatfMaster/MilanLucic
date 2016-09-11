using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class PretnjeRanjivostiViewModel
    {
        public IEnumerable<PretnjaViewModel> Pretnje { get; set; }
        public IEnumerable<Ranjivost> Ranjivosti { get; set; }
        public IEnumerable<MeraZaProcenuRizikaViewModel> Mere { get; set; }
    }
}
