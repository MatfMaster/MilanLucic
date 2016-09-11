using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    [HtmlTargetElement("a2b-panel")]
    public class A2bPanelTagHelper : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var classAttribute = "";
            var sb = new StringBuilder();

            if (output.Attributes.ContainsName("class"))
            {
                classAttribute = output.Attributes["class"].Value.ToString();
            }


            if (string.IsNullOrWhiteSpace(classAttribute))
            {
                sb.AppendLine("<bs-panel>");
            }
            else
            {
                sb.AppendLine($"<bs-panel class=\"{classAttribute}\">");
            }

            output.Attributes.RemoveAll("class");

            sb.AppendLine("    <div class=\"heading\">Edit</div>");
            sb.AppendLine("    <div class=\"body\" >");

            output.PreContent.SetHtmlContent(sb.ToString());

            sb.Clear();
            sb.AppendLine("    </div>");
            sb.AppendLine("</bs-panel>");
            output.PostContent.SetHtmlContent(sb.ToString());
        }
    }
}
