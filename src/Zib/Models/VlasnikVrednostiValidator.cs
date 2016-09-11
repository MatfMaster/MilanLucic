using FluentValidation;

namespace Zib.Models
{
    public class VlasnikVrednostiValidator : AbstractValidator<VlasnikVrednosti>
    {
        public VlasnikVrednostiValidator()
        {
            RuleFor(x => x.Ime).NotEmpty().WithMessage("Ime je obavezno");
            RuleFor(x => x.Prezime).NotEmpty().WithMessage("Prezime je obavezno");
            RuleFor(x => x.OrganizacionaCelinaId).NotEmpty().WithMessage("Organizaciona jedinica je obavezna");
        }
    }
}
