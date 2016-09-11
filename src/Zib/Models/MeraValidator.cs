using FluentValidation;

namespace Zib.Models
{
    public class MeraValidator : AbstractValidator<Mera>
    {
        public MeraValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv mere je obavezan");
        }
    }
}
