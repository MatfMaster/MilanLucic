namespace Common.InputFieldsConfiguration
{
    /**
     *  Za potrebe klijentske validacije Ng2
    */
    public class NgInputFieldValidationViewModel
    {
        public string FieldName { get; set; }
        public NgValidation Validation { get; set; }
    }

    public class NgValidation
    {
        public bool Required { get; set; }
        public int MinLength { get; set; }
        public int MaxLength { get; set; }

    }
}
