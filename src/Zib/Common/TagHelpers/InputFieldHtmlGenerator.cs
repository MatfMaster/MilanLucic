using Common.InputFieldsConfiguration;
using System.Text;

namespace Common.TagHelpers
{
    public class InputFieldHtmlGenerator: IInputFieldHtmlGenerator
    {
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        public InputFieldHtmlGenerator(IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldsConfiguration = inputFieldsConfiguration;
        }
        public string Generate(string propertyName, InputFieldConfiguration configuration)
        {

            var sb = new StringBuilder();
            sb.AppendLine($"        <input type = \"{configuration.InputType}\" class=\"form-control\" id=\"{propertyName}\" placeholder=\"{configuration.Placeholder}\"");
            sb.AppendLine($"                formControlName=\"{propertyName}\"");
            sb.AppendLine($"        />");

            return sb.ToString();
        }


    }
}
