using System.ComponentModel.DataAnnotations;

namespace Zib.ViewModels
{
    public class PretnjaEdit
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Naziv { get; set; }

        public bool? Poverljivost { get; set; }
        public bool? Integritet { get; set; }
        public bool? Raspolozivost { get; set; }

        [Required]
        public int VrstaPretnjeId { get; set; }
    }
}