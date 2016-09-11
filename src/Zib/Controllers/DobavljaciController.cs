using Common.Mvc;
using Zib.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DobavljaciController : AppController
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public DobavljaciController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //throw new System.Exception("Namerna greska");
            var dobavljaci = await _unitOfWork.Dobavljaci.GetAll();
            return Success(dobavljaci);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Dobavljac dobavljac)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.Dobavljaci.Add(dobavljac);
            await _unitOfWork.Complete();
            return Success(dobavljac);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Dobavljac dobavljacEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var dobavljac = await _unitOfWork.Dobavljaci.Get(id);
            if (dobavljac == null) return Fail("Not Found");

            dobavljac.Naziv = dobavljacEdit.Naziv;
            dobavljac.Adresa = dobavljacEdit.Adresa;
            dobavljac.Mesto = dobavljacEdit.Mesto;
            dobavljac.Telefon = dobavljacEdit.Telefon;
            dobavljac.KontaktOsoba = dobavljacEdit.KontaktOsoba;
            dobavljac.Email = dobavljacEdit.Email;

            await _unitOfWork.Complete();
            return Success(dobavljac);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var dobavljac = await _unitOfWork.Dobavljaci.Get(id);
            if (dobavljac == null) return Fail("Not Found");

            _unitOfWork.Dobavljaci.Remove(dobavljac);
            await _unitOfWork.Complete();
            return Success(dobavljac);
        }

    }
}
