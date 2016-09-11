using FluentValidation;

namespace Zib.Models
{
    public class VrstaPretnjeValidator : AbstractValidator<VrstaPretnje>
    {
        public VrstaPretnjeValidator()
        {
            RuleFor(x => x.Opis).NotEmpty().WithMessage("Opis je obavezan");
        }
    }
}
