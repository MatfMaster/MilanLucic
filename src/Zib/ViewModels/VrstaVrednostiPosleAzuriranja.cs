using System.Collections.Generic;
using Zib.Models;

namespace Zib.ViewModels
{
    public class VrstaVrednostiPosleAzuriranja
    {
        public VrstaVrednosti VrstaVrednosti { get; set; }
        public IList<VrstaVrednostiForSelect> VrstaVrednostiForSelect { get; set; }
    }
}
