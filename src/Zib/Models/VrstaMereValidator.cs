using FluentValidation;

namespace Zib.Models
{
    public class VrstaMereValidator : AbstractValidator<VrstaMere>
    {
        public VrstaMereValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
        }
         
    }
}
