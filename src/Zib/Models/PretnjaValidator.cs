using FluentValidation;

namespace Zib.Models
{
    public class PretnjaValidator : AbstractValidator<Pretnja>
    {
        public PretnjaValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
            RuleFor(x => x.VrstaPretnjeId).NotEmpty().WithMessage("Vrsta pretnje je obavezna");
        }
    }
}
