using FluentValidation;

namespace Zib.Models
{
    public class VrstaVrednostiValidator : AbstractValidator<VrstaVrednosti>
    {
        public VrstaVrednostiValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
            RuleFor(x => x.NadredjenaKategorija).NotNull().NotEqual(x => x.Id).When(x => x.Id != 0).WithMessage("Vrsta vrednosti ne može biti nadredjena sama sebi");
        }
    }
}
