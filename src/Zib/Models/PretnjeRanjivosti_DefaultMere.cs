namespace Zib.Models
{
    public class PretnjeRanjivosti_DefaultMere
    {
        public int Id { get; set; }
        public int PretnjeRanjivostiId { get; set; }
        public int MeraId { get; set; }

        public PretnjeRanjivosti PretnjeRanjivosti { get; set; }
        public Mera Mera { get; set; }

    }
}
