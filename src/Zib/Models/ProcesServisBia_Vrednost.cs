namespace Zib.Models
{
    public class ProcesServisBia_Vrednost
    {
        //public int Id { get; set; }
        public int ProcesServisBiaId { get; set; }
        public ProcesServisBia ProcesServisBia { get; set; }

        public int VrednostId { get; set; }
        public Vrednost Vrednost { get; set; }
    }
}
