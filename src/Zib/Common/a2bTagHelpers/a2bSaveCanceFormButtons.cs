using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Common.Util;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    [HtmlTargetElement("a2b-save-cancel-form-buttons")]
    public class A2bSaveCancelFormButtonsTagHelper : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var sb = new StringBuilder();

            sb.AppendLine("<form-buttons-group");
            sb.AppendLine("    [submitPending] = \"submitPending\"");
            sb.AppendLine("    [saveDisabled]=\"(!inEdit && !formDirty) || (!formValid && !serverValidationError)\"");
            sb.AppendLine("    [cancelDisabled] = \"(!inEdit && !formDirty)\"");
            sb.AppendLine("    (save) = \"save()\"");
            sb.AppendLine("    (cancel) = \"cancel()\" >");
            sb.AppendLine("</form-buttons-group>");

            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(sb.ToString());
        }
    }
}
