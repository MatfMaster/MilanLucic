using FluentValidation;

namespace Zib.Models
{
    public class DobavljacValidator : AbstractValidator<Dobavljac>
    {
        public DobavljacValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv dobavljača je obavezan");
            RuleFor(x => x.Email).EmailAddress().WithMessage("Proverite validnost email adrese");
        }
    }
}
