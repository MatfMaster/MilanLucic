using Common.InputFieldsConfiguration;

namespace Common.TagHelpers
{
    public interface IInputFieldValidationGenerator
    {
        string Generate(string propertyName, InputFieldConfiguration configuration);
    }
}
