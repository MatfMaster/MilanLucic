using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class ProcenaRizikaVrsteVrednostiViewModel
    {
        public IList<PretnjeRanjivostiZaProcenuRizikaViewModel> PretnjeRanjivosti { get; set; }
        public IList<VrstaVrednostiTree> VrsteVrednostiHijerarhija { get; set; }
        public IEnumerable<MeraZaProcenuRizikaViewModel> Mere { get; set; }
        public IEnumerable<IntenzitetPretnje> IntenzitetPretnji { get; set; }
        public IEnumerable<IntenzitetRanjivosti> IntenzitetRanjivosti { get; set; }
    }
}
