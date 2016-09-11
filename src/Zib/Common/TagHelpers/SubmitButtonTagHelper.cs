using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Common.TagHelpers
{
    [HtmlTargetElement("fw-submit-button")] //, Attributes = "text,col,col-offset")]
    public class SubmitButtonTagHelper : TagHelper
    {
        public string Text { get; set; }
        public string Col { get; set; } = "9";
        public string ColOffset { get; set; } = "3";

        //[HtmlAttributeName("text")]
        //public ModelExpression Text { get; set; }

        //[HtmlAttributeName("col")]
        //public ModelExpression Col { get; set; }

        //[HtmlAttributeName("col-offset")]
        //public ModelExpression ColOffset { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"<div class=\"form-group\">");
            sb.AppendLine($"    <div class=\"col-md-offset-{ColOffset} col-md-{Col}\">");
            sb.AppendLine($"        <button type = \"submit\" class=\"btn btn-primary\" [disabled]=\"!f.valid\">{Text}</button>");
            sb.AppendLine($"    </div>");
            sb.AppendLine($"</div>");

            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(sb.ToString());
        }
    }
}
