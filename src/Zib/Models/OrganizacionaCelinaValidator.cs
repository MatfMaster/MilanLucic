using FluentValidation;

namespace Zib.Models
{
    public class OrganizacionaCelinaValidator : AbstractValidator<OrganizacionaCelina>
    {
        public OrganizacionaCelinaValidator()
        {
            RuleFor(x => x.Naziv).NotEmpty().WithMessage("Naziv je obavezan");
        }
    }
}
