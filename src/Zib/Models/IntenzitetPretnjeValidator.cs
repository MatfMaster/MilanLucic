using FluentValidation;

namespace Zib.Models
{
    public class IntenzitetPretnjeValidator : AbstractValidator<IntenzitetPretnje>
    {
        public IntenzitetPretnjeValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
            RuleFor(x => x.Vrednost).NotEmpty().WithMessage("Vrednost je obavezna");
        }
    }
}
