namespace Zib.Models
{
    public class VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere
    {
        public int Id { get; set; }
        public int VrstaVrednosti_PretnjaRanjivostId { get; set; }
        public int MeraId { get; set; }

        public VrsteVrednosti_PretnjeRanjivosti VrsteVrednosti_PretnjeRanjivosti { get; set; }
        public Mera Mera { get; set; }
    }
}
