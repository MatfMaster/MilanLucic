using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Common.Filters
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var message = context.Exception.Message;
            if (context.Exception.InnerException != null)
            {
                message += "\n\r" + context.Exception.InnerException.Message;
            }

            context.Result = new ObjectResult(new { success = false, errorMessage = message });
        }
    }

}
