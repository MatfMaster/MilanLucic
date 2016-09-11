using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    [HtmlTargetElement("a2b-select-field", Attributes = "for, items, text-field")]
    public class A2bSelectFieldTagHelper : TagHelper
    {
        [HtmlAttributeName("for")]
        public ModelExpression For { get; set; }

        [HtmlAttributeName("items")]
        public string Items { get; set; }

        [HtmlAttributeName("text-field")]
        public string TextField { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var sb = new StringBuilder();

            var labelText = TagHelperUtil.DisplayName(For);
            var fieldName = TagHelperUtil.FieldName(For);

            sb.AppendLine($"<field label=\"{labelText}\" [inputControl]=\"formGroup.controls.{fieldName}\" >");
            sb.AppendLine($"    <ng-select textField=\"{TextField}\"");
            sb.AppendLine($"        [items]=\"{Items}\"");
            //sb.AppendLine($"        [(ngModel)]=\"formRow.{fieldName}\"");
            sb.AppendLine($"        formControlName=\"{fieldName}\" >");
            sb.AppendLine($"    </ng-select>");
            sb.AppendLine($"</field>");

            TagHelperUtil.Output(output, sb);
        }
    }
}
