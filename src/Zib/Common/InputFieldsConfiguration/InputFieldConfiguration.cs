namespace Common.InputFieldsConfiguration
{



    public class InputFieldConfiguration
    {
        public string Id { get; set; }
        public bool Active { get; set; }
        public string InputType { get; set; }
        public string DisplayName { get; set; }
        public string Placeholder { get; set; }        
        public string LabelClass { get; set; }   // col-md-3
        public string InputClass { get; set; }   // col-md-9
        public InputFieldValidation Validation { get; set; }


        public InputFieldConfiguration()
        {
            Active = true;
            Placeholder = "";
            InputType = "text";
            LabelClass = "col-md-3";
            InputClass = "col-md-9";
            Validation = null; // new List<InputFieldValidation>();
        }

    }

}
