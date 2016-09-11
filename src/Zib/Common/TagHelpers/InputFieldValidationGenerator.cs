using Common.InputFieldsConfiguration;
using System.Text;

namespace Common.TagHelpers
{
    public class InputFieldValidationGenerator : IInputFieldValidationGenerator
    {
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        public InputFieldValidationGenerator(IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldsConfiguration = inputFieldsConfiguration;
        }

        public string Generate(string propertyName, InputFieldConfiguration configuration)
        {
            var sb = new StringBuilder();

            if (configuration.Validation == null) return "";

            sb.AppendLine($"        <div *ngIf = \"{propertyName}.touched && {propertyName}.errors\" >");

            if (configuration.Validation.Required)
            {
                sb.AppendLine($"            <div *ngIf=\"{propertyName}.errors.required\" class=\"input-error\">");
                sb.AppendLine($"                {configuration.Validation.Required_ErrorMessage}");
                sb.AppendLine($"            </div>");
            }

            if (configuration.Validation.MinLength > 0)
            {
                var message = string.Format(configuration.Validation.MinLength_ErrorMessage, configuration.Validation.MinLength);
                sb.AppendLine($"            <div *ngIf=\"{propertyName}.errors.minlength\" class=\"input-error\">");
                sb.AppendLine($"                {message}");
                sb.AppendLine($"            </div>");
            }

            if (configuration.Validation.MaxLength > 0)
            {
                var message = string.Format(configuration.Validation.MaxLength_ErrorMessage, configuration.Validation.MaxLength);
                sb.AppendLine($"            <div *ngIf=\"{propertyName}.errors.maxlength\" class=\"input-error\">");
                sb.AppendLine($"                {message}");
                sb.AppendLine($"            </div>");
            }

            sb.AppendLine($"        </div>");
            return sb.ToString();
        }
    }
}
