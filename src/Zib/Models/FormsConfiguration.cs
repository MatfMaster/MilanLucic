using Common.FormsConfiguration;
using Common.InputFieldsConfiguration;
using Common.Util;
using System.Collections.Generic;
using System.Linq;

namespace Zib.Models
{
    public class FormsConfiguration : IFormsConfiguration
    {
        private List<KeyValuePair<string, List<string>>> Configuration = new List<KeyValuePair<string, List<string>>>();
        private IInputFieldsConfiguration _inputFieldsConfiguration;

        public FormsConfiguration(IInputFieldsConfiguration inputFieldsConfiguration)
        {
            _inputFieldsConfiguration = inputFieldsConfiguration;
            AddConfiguration("login", "UserName", "Password");
            AddConfiguration("ranjivosti", "Opis");
            //Configuration.Add(new KeyValuePair<string, FormConfiguration> ( "login", new FormConfiguration { FormName = "login", Fields = new List<string>().Add("UserName")} "UserName, Password" ) );
        }

        private void AddConfiguration(string formName, params string[] fields)
        {
            var fieldsList = new List<string>();
            foreach (var field in fields)
            {
                fieldsList.Add(field);
            }

            Configuration.Add(new KeyValuePair<string, List<string>>( formName, fieldsList));
        }

        public List<NgInputFieldValidationViewModel> GetConfiguration(string form)
        {
            var formFields = GetConfigurationForForm(form);
            return ConfigureForm(formFields);
        }

        private List<string> GetConfigurationForForm(string field)
        {
            return Configuration.Where(c => c.Key.ToLower() == field.ToLower()).FirstOrDefault().Value;
        }

        private List<NgInputFieldValidationViewModel> ConfigureForm(List<string> fields)
        {
            var ngInputFieldsValidationViewModel = new List<NgInputFieldValidationViewModel>();

            if (fields == null || fields.Count() == 0) return null;

            foreach (var formField in fields)
            {
                var field = formField.Trim();
                var _inputFieldConfiguration = _inputFieldsConfiguration.GetConfigurationFor(field);
                if (_inputFieldConfiguration != null)
                {
                    ngInputFieldsValidationViewModel.Add(
                        new NgInputFieldValidationViewModel
                        {
                            FieldName = field.ToCamelCase(),
                            Validation = new NgValidation
                            {
                                Required = _inputFieldConfiguration.Validation.Required,
                                MinLength = _inputFieldConfiguration.Validation.MinLength,
                                MaxLength = _inputFieldConfiguration.Validation.MaxLength
                            }
                        }
                    );
                }
            }

            return ngInputFieldsValidationViewModel;
        }
    }


    public class FormConfiguration
    {
        public string FormName { get; set; }
        public IList<string> Fields { get; set; }
    }
}
