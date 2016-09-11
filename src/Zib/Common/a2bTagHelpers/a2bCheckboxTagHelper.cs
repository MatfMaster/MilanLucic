using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    [HtmlTargetElement("a2b-checkbox", Attributes = "for")]
    public class A2bCheckboxTagHelper : TagHelper
    {
        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var sb = new StringBuilder();

            var labelText = TagHelperUtil.DisplayName(For);
            var fieldName = TagHelperUtil.FieldName(For);

            sb.AppendLine($"<checkbox label=\"{labelText}\" [inputControl]=\"formGroup.controls.{fieldName}\" >");
            sb.AppendLine($"    <input noBootstrap type=\"checkbox\" formControlName=\"{fieldName}\" />");       
            //sb.AppendLine($"    <input noBootstrap type=\"checkbox\" formControlName=\"{fieldName}\" [(ngModel)]=\"formRow.{fieldName}\" />");       
            sb.AppendLine($"</checkbox>");

            TagHelperUtil.Output(output, sb);
        }
    }
}
