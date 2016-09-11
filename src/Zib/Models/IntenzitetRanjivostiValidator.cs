using FluentValidation;

namespace Zib.Models
{
    public class IntenzitetRanjivostiValidator : AbstractValidator<IntenzitetRanjivosti>
    {
        public IntenzitetRanjivostiValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
            RuleFor(x => x.Vrednost).NotEmpty().WithMessage("Vrednost je obavezna");
        }
    }
}
