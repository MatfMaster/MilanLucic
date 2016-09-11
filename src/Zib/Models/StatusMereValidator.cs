using FluentValidation;

namespace Zib.Models
{
    public class StatusMereValidator : AbstractValidator<StatusMere>
    {
        public StatusMereValidator()
        {
            RuleFor(x => x.Status).NotEmpty().WithMessage("Status je obavezan");
        }
    }
}
