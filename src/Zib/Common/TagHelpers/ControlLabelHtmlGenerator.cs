using Common.InputFieldsConfiguration;

namespace Common.TagHelpers
{
    public class ControlLabelHtmlGenerator : IControlLabelHtmlGenerator
    {
        public string Generate(string propertyName, InputFieldConfiguration configuration)
        {
            if (configuration.InputType == "hidden")
            {
                return "";
            }

            return ($"<label for=\"{propertyName}\" class=\"control-label {configuration.LabelClass}\">{configuration.DisplayName}</label>");            
        }
    }
}
