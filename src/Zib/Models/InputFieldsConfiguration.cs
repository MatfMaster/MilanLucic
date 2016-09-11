using Common.InputFieldsConfiguration;
using System.Collections.Generic;
using System.Linq;

namespace Zib.Models
{
    public class InputFieldsConfiguration : IInputFieldsConfiguration
    {
        private List<KeyValuePair<string, InputFieldConfiguration>> Configuration = new List<KeyValuePair<string, InputFieldConfiguration>>();
        public InputFieldsConfiguration()
        {
            AddConfiguration("UserName", new InputFieldConfiguration { DisplayName = "Korisničko ime"}, new InputFieldValidation { Required = true, MinLength = 3, MaxLength = 25});
            AddConfiguration("Password", new InputFieldConfiguration { DisplayName = "Lozinka", InputType = "password" }, new InputFieldValidation { Required = true });
            AddConfiguration("Opis", new InputFieldConfiguration { DisplayName = "Opis" }, new InputFieldValidation { Required = true });
        }

        //public List<KeyValuePair<string, InputFieldConfiguration>> Configuration = new List<KeyValuePair<string, InputFieldConfiguration>> {
        //        new KeyValuePair<string, InputFieldConfiguration>("UserName", new InputFieldConfiguration {
        //            Id = "login.username", DisplayName = "Korisničko ime", InputType = "text", LabelClass = "col-md-3", InputClass = "col-md-9", Hidden = false
        //        }),
        //        new KeyValuePair<string, InputFieldConfiguration>("password", new InputFieldConfiguration {
        //            DisplayName = "Lozinka", InputType = "password"
        //        })

        //    };

        public InputFieldConfiguration GetConfigurationFor(string field)
        {
            return  Configuration.Where(c => c.Key.ToLower() == field.ToLower()).FirstOrDefault().Value;
        }

        /**
         * Helper za dodavanje konfiguracije
         */ 
        private void AddConfiguration(string field, InputFieldConfiguration configuration, InputFieldValidation validation = null)
        {
            if (validation != null)
            {
                configuration.Validation = validation;
            }

            Configuration.Add(new KeyValuePair<string, InputFieldConfiguration>(field, configuration));
        }

    }
}
