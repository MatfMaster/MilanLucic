using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    [HtmlTargetElement("a2b-form-horizontal")]
    public class A2bFormHorizontalTagHelper : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {

            var sb = new StringBuilder();

            sb.AppendLine("<server-error [error]=\"serverErrorMessage\"></server-error>");
            sb.AppendLine("<form *ngIf=\"!isResetting\" [formGroup]=\"formGroup\" #forma (ngSubmit)=\"onSubmit()\">");

            output.Attributes.RemoveAll("a2b-form-horizontal");
            output.PreContent.SetHtmlContent(sb.ToString());
            output.PostContent.SetHtmlContent("</form>");
        }
    }
}
