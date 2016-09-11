namespace Zib.Models
{
    public class ProcesServisBia_Dobavljac
    {
        //public int Id { get; set; }
        public int ProcesServisBiaId { get; set; }
        public ProcesServisBia ProcesServisBia { get; set; }

        public int DobavljacId { get; set; }
        public Dobavljac Dobavljac { get; set; }
    }
}
