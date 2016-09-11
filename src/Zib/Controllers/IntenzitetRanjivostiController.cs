using Common.Mvc;
using Zib.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class IntenzitetRanjivostiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public IntenzitetRanjivostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var intenzitetRanjivosti = await _unitOfWork.IntenzitetRanjivosti.GetAll();
            return Success(intenzitetRanjivosti);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]IntenzitetRanjivosti intenzitetRanjivosti)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.IntenzitetRanjivosti.Add(intenzitetRanjivosti);
            await _unitOfWork.Complete();

            return Success(await _unitOfWork.IntenzitetRanjivosti.Get(intenzitetRanjivosti.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] IntenzitetRanjivosti intenzitetRanjivostiEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var intenzitetRanjivosti = await _unitOfWork.IntenzitetRanjivosti.Get(id);
            if (intenzitetRanjivosti == null) return Fail("Not Found");

            intenzitetRanjivosti.Naziv = intenzitetRanjivostiEdit.Naziv;
            intenzitetRanjivosti.Vrednost = intenzitetRanjivostiEdit.Vrednost;

            await _unitOfWork.Complete();
            
            return Success(await _unitOfWork.IntenzitetRanjivosti.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var intenzitetRanjivosti = await _unitOfWork.IntenzitetRanjivosti.Get(id);
            if (intenzitetRanjivosti == null) return Fail("Not Found");

            _unitOfWork.IntenzitetRanjivosti.Remove(intenzitetRanjivosti);
            await _unitOfWork.Complete();
            return Success(intenzitetRanjivosti);
        }

    }
}
