using FluentValidation;

namespace Zib.Models
{
    public class PoslovnaVrednostValidator : AbstractValidator<PoslovnaVrednost>
    {
        public PoslovnaVrednostValidator()
        {
            RuleFor(x => x.Vrednost).NotEmpty().WithMessage("Vrednost je obavezna");
        }
    }
}
