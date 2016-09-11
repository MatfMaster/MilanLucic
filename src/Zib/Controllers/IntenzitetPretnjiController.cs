using Common.Mvc;
using Zib.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class IntenzitetPretnjiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public IntenzitetPretnjiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //throw new System.Exception("Namerna greska");
            var intenzitetPretnji = await _unitOfWork.IntenzitetPretnji.GetAll();
            return Success(intenzitetPretnji);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]IntenzitetPretnje intenzitetPretnje)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.IntenzitetPretnji.Add(intenzitetPretnje);
            await _unitOfWork.Complete();

            return Success(await _unitOfWork.IntenzitetPretnji.Get(intenzitetPretnje.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] IntenzitetPretnje intenzitetPretnjeEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var intenzitetPretnje = await _unitOfWork.IntenzitetPretnji.Get(id);
            if (intenzitetPretnje == null) return Fail("Not Found");

            intenzitetPretnje.Naziv = intenzitetPretnjeEdit.Naziv;
            intenzitetPretnje.Vrednost = intenzitetPretnjeEdit.Vrednost;

            await _unitOfWork.Complete();
            
            return Success(await _unitOfWork.IntenzitetPretnji.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var intenzitetPretnje = await _unitOfWork.IntenzitetPretnji.Get(id);
            if (intenzitetPretnje == null) return Fail("Not Found");

            _unitOfWork.IntenzitetPretnji.Remove(intenzitetPretnje);
            await _unitOfWork.Complete();
            return Success(intenzitetPretnje);
        }

    }
}
