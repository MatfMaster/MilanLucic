using Common.Util;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    public static class TagHelperUtil
    {
        public static string DisplayName(ModelExpression modelExpression)
        {
            return modelExpression.Metadata.DisplayName != null ? modelExpression.Metadata.DisplayName : modelExpression.Metadata.PropertyName;
        }

        public static string FieldName(ModelExpression modelExpression)
        {
            return modelExpression.Metadata.PropertyName.ToCamelCase(); ;
        }

        public static void Output(TagHelperOutput output, StringBuilder sb)
        {
            output.TagName = "";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Content.SetHtmlContent(sb.ToString());
        }
    }
}
