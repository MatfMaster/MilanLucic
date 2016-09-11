using Common.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace Zib.Controllers
{
    [Route("templates/{template}")]
    public class TemplatesController : AppController
    {
        //[ResponseCache(Duration = 3600)]
        //[ResponseCache(Duration = 86400)]
        public PartialViewResult Template(string template)
        {
            return PartialView(template);
        }
    }
}
