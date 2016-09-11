using Common.InputFieldsConfiguration;
using Common.Util;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;


//<div class="form-group">
//    <label for="userName" class="col-md-3 control-label">Korisničko ime</label>
//    <div class="col-md-9">
//        <input type = "text" class="form-control" id="userName" placeholder="Korisničko ime"
//                ngControl="userName"
//                #userName="ngForm"
//                required />
//        <div* ngIf = "userName.touched && userName.errors" >
//            < div * ngIf = "userName.errors.required" class="input-error">
//                Korisničko ime je obavezno
//            </div>
//        </div>
//    </div>
//</div>



namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-form-group", Attributes = ForAttributeName)]
    public class FormGroupTagHelper : TagHelper
    {
        private const string ForAttributeName = "for";
        private IInputFieldHtmlGenerator _inputFieldHtmlGenerator;
        private IInputFieldValidationGenerator _inputFieldValidationGenerator;
        private IInputFieldsConfiguration _inputFieldsConfiguration;
        private IControlLabelHtmlGenerator _labelHtmlGenerator;

        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        public FormGroupTagHelper(
            IInputFieldHtmlGenerator inputFieldHtmlGenerator, 
            IInputFieldValidationGenerator inputFieldValidationGenerator,
            IInputFieldsConfiguration inputFieldsConfiguration,
            IControlLabelHtmlGenerator labelHtmlGenerator)
        {
            _inputFieldHtmlGenerator = inputFieldHtmlGenerator;
            _inputFieldValidationGenerator = inputFieldValidationGenerator;
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
            var inputHtml = _inputFieldHtmlGenerator.Generate(propertyName, configuration);
            var validationHtml = _inputFieldValidationGenerator.Generate(propertyName, configuration);

            var sb = new StringBuilder();
            sb.AppendLine($"<div class=\"form-group\">");
            sb.AppendLine(labelHtml);
            sb.AppendLine($"<div class=\"{configuration.InputClass}\">");
            sb.AppendLine(inputHtml);
            //sb.AppendLine(validationHtml);
            sb.AppendLine($"</div>");
            sb.AppendLine($"</div>");


            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(sb.ToString());

        }
    }
}

