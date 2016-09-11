using Common.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using Zib.Common.Mvc;

namespace Common.Mvc
{
    public class AppController: Controller
    {
        protected IActionResult Success(object result = null)
        {
            var ret = result != null ? new ObjectResult(new { success = true, data = result }) : new ObjectResult(new { success = true });
            return ret;
        }

        protected IActionResult Fail(ModelStateDictionary modelState)
        {
            var errors = new List<Error>();

            foreach (var pair in ModelState)
            {
                foreach (var error in pair.Value.Errors)
                {
                    errors.Add(new Error { Property = pair.Key.ToCamelCase(), Message = error.ErrorMessage });
                }
            }

            return new ObjectResult(new { success = false, errors = errors });
        }

        protected IActionResult Fail(object result)
        {
            return new ObjectResult(new { success = false, errors = result });
        }
    }

}
