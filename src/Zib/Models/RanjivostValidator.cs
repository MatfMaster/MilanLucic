using FluentValidation;

namespace Zib.Models
{
    public class RanjivostValidator : AbstractValidator<Ranjivost>
    {
        public RanjivostValidator()
        {
            RuleFor(x => x.Opis).NotEmpty().WithMessage("Opis je obavezan");
        }
    }
}
