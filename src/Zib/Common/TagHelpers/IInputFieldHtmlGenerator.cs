using Common.InputFieldsConfiguration;

namespace Common.TagHelpers
{
    public interface IInputFieldHtmlGenerator
    {
        string Generate(string propertyName, InputFieldConfiguration configuration);
    }
}
