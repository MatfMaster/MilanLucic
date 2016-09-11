using Common.InputFieldsConfiguration;
using System.Collections.Generic;

namespace Common.FormsConfiguration
{
    public interface IFormsConfiguration
    {
        List<NgInputFieldValidationViewModel> GetConfiguration(string form);
        //string GetConfigurationForForm(string field);
    }
}
