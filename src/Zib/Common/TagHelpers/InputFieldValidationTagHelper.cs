using Common.InputFieldsConfiguration;
using Common.Util;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;



namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-input-field-validation", Attributes = ForAttributeName)]
    public class InputFieldValidationTagHelper : TagHelper
    {
        private const string ForAttributeName = "for";
        private IInputFieldValidationGenerator _inputFieldValidationGenerator;
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        public InputFieldValidationTagHelper(
            IInputFieldValidationGenerator inputFieldValidationGenerator,
            IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldValidationGenerator = inputFieldValidationGenerator;
            _inputFieldsConfiguration = inputFieldsConfiguration;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {            
            var field = For.Name;
            InputFieldConfiguration configuration;

            configuration = _inputFieldsConfiguration.GetConfigurationFor(field);

            // Ako nisam nasao konfiguraciju uzimam default - samo za display name uzimam ime propertija
            if (configuration == null)
            {
                configuration = new InputFieldConfiguration { DisplayName = field };
            }

            var propertyName = field.ToCamelCase();
            var validationHtml = _inputFieldValidationGenerator.Generate(propertyName, configuration);

            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(validationHtml);

        }
    }
}

