using Common.InputFieldsConfiguration;
using Common.Util;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-control-label", Attributes = ForAttributeName)]
    public class ControlLabelTagHelper : TagHelper
    {
        private const string ForAttributeName = "for";
        private IControlLabelHtmlGenerator _labelHtmlGenerator;
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        public ControlLabelTagHelper(IInputFieldsConfiguration inputFieldsConfiguration, IControlLabelHtmlGenerator labelHtmlGenerator)
        {
            _inputFieldsConfiguration = inputFieldsConfiguration;
            _labelHtmlGenerator = labelHtmlGenerator;
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
            var labelHtml = _labelHtmlGenerator.Generate(propertyName, configuration);

            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(labelHtml);
        }
    }
}
