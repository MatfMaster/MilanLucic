using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Zib.Common.A2bTagHelpers
{
    //[HtmlTargetElement("a2b-crud-scrolltable-panel", Attributes = "on-add, on-delete, disabled, filter, columns, on-rowchanged")]
    [HtmlTargetElement("a2b-crud-scrolltable-panel")]
    public class A2bCrudScrollTablePanelFieldTagHelper : TagHelper
    {

        [HtmlAttributeName("on-add")]
        public string OnAdd { get; set; }

        [HtmlAttributeName("on-delete")]
        public string OnDelete { get; set; }

        [HtmlAttributeName("disabled")]
        public string Disabled { get; set; }

        [HtmlAttributeName("filter")]
        public string Filter { get; set; }

        [HtmlAttributeName("columns")]
        public string Columns { get; set; }

        [HtmlAttributeName("on-rowchanged")]
        public string OnRowchanged { get; set; }


        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (OnAdd == null) OnAdd = "dodaj";
            if (OnDelete == null) OnDelete = "obrisi";
            if (Disabled == null) Disabled = "tableDisabled";
            if (Filter == null) Filter = "true";
            if (Columns == null) Columns = "columns";
            if (OnRowchanged == null) OnRowchanged = "rowChanged";

            var sb = new StringBuilder();

            var columnWidth = "col-md-6";
            //var classAttribute = output.Attributes["class"];
            //if (classAttribute != null)
            if (output.Attributes.ContainsName("class"))
            {
                columnWidth = output.Attributes["class"].Value.ToString();
            }

            sb.AppendLine($"<div class=\"{columnWidth}\">");
            sb.AppendLine($"    <bs-panel class=\"panel-body-with-table\">");
            sb.AppendLine($"        <div class=\"heading\">");
            sb.AppendLine($"            <div class=\"pull-right\">");
            sb.AppendLine($"                <button-add (add)=\"{OnAdd}()\" [disabled]=\"{Disabled}()\"></button-add>");
            sb.AppendLine($"                <button-delete (delete)=\"{OnDelete}()\" [disabled]=\"{Disabled}()\"></button-delete>");
            sb.AppendLine($"            </div>");
            sb.AppendLine( "            <h4>{{title}}</h4>");
            sb.AppendLine($"        </div>");
            sb.AppendLine($"        <div class=\"body\">");
            sb.AppendLine($"            <scrollable-table [filter]=\"{Filter}\"");
            sb.AppendLine($"                  [columns]=\"{Columns}\"");
            sb.AppendLine($"                  (rowChanged)=\"{OnRowchanged}($event)\"");
            sb.AppendLine($"                  [disabled]=\"{Disabled}()\">");
            sb.AppendLine($"            </scrollable-table>");
            sb.AppendLine($"        </div>");
            sb.AppendLine($"    </bs-panel>");
            sb.AppendLine($"</div>");

            TagHelperUtil.Output(output, sb);
        }
    }
}
