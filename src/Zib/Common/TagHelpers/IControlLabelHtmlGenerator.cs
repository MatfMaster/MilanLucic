using Common.InputFieldsConfiguration;

namespace Common.TagHelpers
{
    public interface IControlLabelHtmlGenerator
    {
        string Generate(string propertyName, InputFieldConfiguration configuration);
    }
}