using System.Collections.Generic;

namespace Zib.Models
{
    public class PretnjeRanjivosti
    {
        public int Id { get; set; }
        public int PretnjaId { get; set; }
        public int RanjivostId { get; set; }

        public Pretnja Pretnja { get; set; }
        public Ranjivost Ranjivost { get; set; }

        public List<VrsteVrednosti_PretnjeRanjivosti> VrsteVrednosti_PretnjeRanjivosti { get; set; }

        public virtual List<PretnjeRanjivosti_DefaultMere> PretnjeRanjivosti_DefaultMere { get; set; }

        public PretnjeRanjivosti()
        {
            VrsteVrednosti_PretnjeRanjivosti = new List<VrsteVrednosti_PretnjeRanjivosti>();
            PretnjeRanjivosti_DefaultMere = new List<PretnjeRanjivosti_DefaultMere>();
        }
    }
}
