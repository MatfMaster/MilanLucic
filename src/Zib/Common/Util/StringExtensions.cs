namespace Common.Util
{
    public static class StringExtensions
    {
        public static string ToCamelCase(this string the_string)
        {
            //if (the_string == null || the_string.Length < 2)
            //    return the_string.ToLower();

            if (the_string == null) return null;

            return the_string.Substring(0, 1).ToLowerInvariant() + the_string.Substring(1);
        }
    }
}
