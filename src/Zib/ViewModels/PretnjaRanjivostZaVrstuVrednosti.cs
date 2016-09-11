using Zib.Models;

namespace Zib.ViewModels
{
    public class PretnjaRanjivostZaVrstuVrednosti
    {
        public int Id { get; set; }
        //public int PretnjaPreVrednost { get; set; }
        //public int PretnjaPosleVrednost { get; set; }
        //public int RanjivostPreVrednost { get; set; }
        //public int RanjivostPosleVrednost { get; set; }
        public int RizikPre { get; set; }
        public int RizikPosle { get; set; }

        public IntenzitetPretnjeViewModel PretnjaPre { get; set; }
        public IntenzitetPretnjeViewModel PretnjaPosle { get; set; }
        public IntenzitetRanjivostiViewModel RanjivostPre { get; set; }
        public IntenzitetRanjivostiViewModel RanjivostPosle { get; set; }

        public int VrstaVrednostiId { get; set; }
        public int PretnjaRanjivostId { get; set; }
    }
}
