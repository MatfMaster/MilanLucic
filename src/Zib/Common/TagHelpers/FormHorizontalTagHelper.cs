using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-form-horizontal")]
    public class FormHorizontalTagHelper : TagHelper
    {

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {

            output.Attributes.RemoveAll("fw-form-horizontal");
            output.PreContent.SetHtmlContent("<form class=\"form-horizontal\" [formGroup]=\"formControlGroup\" #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.form)\">");
            output.PostContent.SetHtmlContent("</form>");
        }
    }
}
