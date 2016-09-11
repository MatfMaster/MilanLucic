using Common.Persistance;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(VlasnikVrednostiValidator))]
    public class VlasnikVrednosti : IEntity
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public int OrganizacionaCelinaId { get; set; }

        public OrganizacionaCelina OrganizacionaCelina { get; set; }
    }
}
