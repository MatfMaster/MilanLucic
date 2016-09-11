using Common.InputFieldsConfiguration;
using Common.Util;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-input-field", Attributes = ForAttributeName)]
    public class InputFieldTagHelper : TagHelper
    {
        private const string ForAttributeName = "for";
        private IInputFieldHtmlGenerator _inputFieldHtmlGenerator;
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        public InputFieldTagHelper(
            IInputFieldHtmlGenerator inputFieldHtmlGenerator, 
            IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldHtmlGenerator = inputFieldHtmlGenerator;
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
            var inputHtml = _inputFieldHtmlGenerator.Generate(propertyName, configuration);

            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(inputHtml);

        }
    }
}

