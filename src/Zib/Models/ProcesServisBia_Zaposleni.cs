namespace Zib.Models
{
    public class ProcesServisBia_Zaposleni
    {
        //public int Id { get; set; }
        public int ProcesServisBiaId { get; set; }
        public ProcesServisBia ProcesServisBia { get; set; }

        public int ZaposleniId { get; set; }
        public Zaposleni Zaposleni { get; set; }
    }
}
