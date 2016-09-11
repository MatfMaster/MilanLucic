using Common.Mvc;
using Zib.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RanjivostiController : AppController
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public RanjivostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //throw new System.Exception("Namerna greska");
            var ranjivosti = await _unitOfWork.Ranjivosti.GetAll();
            return Success(ranjivosti);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Ranjivost ranjivost)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.Ranjivosti.Add(ranjivost);
            await _unitOfWork.Complete();
            return Success(ranjivost);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Ranjivost ranjivostEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            //Thread.Sleep(2000);
            var ranjivost = await _unitOfWork.Ranjivosti.Get(id);
            if (ranjivost == null) return Fail("Not Found");

            ranjivost.Opis = ranjivostEdit.Opis;
            await _unitOfWork.Complete();
            return Success(ranjivost);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var ranjivost = await _unitOfWork.Ranjivosti.Get(id);
            if (ranjivost == null) return Fail("Not Found");

            _unitOfWork.Ranjivosti.Remove(ranjivost);
            await _unitOfWork.Complete();
            return Success(ranjivost);
        }

    }
}
