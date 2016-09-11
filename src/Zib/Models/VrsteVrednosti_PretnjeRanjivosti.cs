using Common.Persistance;
using System.Collections.Generic;

namespace Zib.Models
{
    public class VrsteVrednosti_PretnjeRanjivosti: IEntity
    {
        public int Id { get; set; }

        public int VrstaVrednostiId { get; set; }
        public int PretnjaRanjivostId { get; set; }

        public int PretnjaPreId { get; set; }
        public int PretnjaPosleId { get; set; }
        public int RanjivostPreId { get; set; }
        public int RanjivostPosleId { get; set; }

        public VrstaVrednosti VrstaVrednosti { get; set; }
        public PretnjeRanjivosti PretnjeRanjivosti { get; set; }

        public IntenzitetPretnje PretnjaPre { get; set; }
        public IntenzitetPretnje PretnjaPosle { get; set; }
        public IntenzitetRanjivosti RanjivostPre { get; set; }
        public IntenzitetRanjivosti RanjivostPosle { get; set; }


        public List<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere> VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere { get; set; }

        public VrsteVrednosti_PretnjeRanjivosti()
        {
            VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere = new List<Models.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere>();
        }
    }
}
