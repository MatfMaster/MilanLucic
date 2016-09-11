namespace Common.InputFieldsConfiguration
{
    public class InputFieldValidation
    {
        public bool ClientValidation { get; set; }
        public bool Required { get; set; }
        public string Required_ErrorMessage { get; set; }
        public int MinLength { get; set; }
        public string MinLength_ErrorMessage { get; set; }
        public int MaxLength { get; set; }
        public string MaxLength_ErrorMessage { get; set; }

        public InputFieldValidation()
        {
            Required = false;
            MinLength = 0;
            MaxLength = 0;
            Required_ErrorMessage = "Polje je obavezno";
            MinLength_ErrorMessage = "Minimalna dužina polja je {0}";
            MaxLength_ErrorMessage = "Maksimalna dužina polja je {0}";
        }
    }
}
