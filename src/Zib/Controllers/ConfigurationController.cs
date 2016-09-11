using Common.FormsConfiguration;
using Common.InputFieldsConfiguration;
using Microsoft.AspNetCore.Mvc;

namespace Zib.Controllers
{
    public class ConfigurationController: Controller
    {
        private IFormsConfiguration _formsConfiguration;
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        public ConfigurationController(IFormsConfiguration formsConfiguration, IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldsConfiguration = inputFieldsConfiguration;
            _formsConfiguration = formsConfiguration;
        }

        public IActionResult FormValidationConfiguration(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return new ObjectResult(new { success = true });

            return new ObjectResult(new { success = true, data = _formsConfiguration.GetConfiguration(id) });
        }
    }
}
