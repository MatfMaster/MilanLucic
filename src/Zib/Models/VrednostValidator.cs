using FluentValidation;


namespace Zib.Models
{
    public class VrednostValidator : AbstractValidator<Vrednost>
    {
        public VrednostValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
            RuleFor(x => x.VrstaVrednostiId).NotEmpty().WithMessage("Vrednost je obavezna");
        }
    }
}
