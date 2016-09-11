using Common.Mvc;
using Zib.Models;
using AutoMapper;
using Zib.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MereController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public MereController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var mere = await _unitOfWork.Mere.GetAll();
            var statusMere = await _unitOfWork.Mere.StatusMere();
            var zaduzenZaImplementaciju = await _unitOfWork.Zaposleni.ZaposleniZaSelect();
            var mereViewModel = new MereViewModel { Mere = mere, StatusMere = statusMere, Zaposleni = zaduzenZaImplementaciju};
            return Success(mereViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Mera mera)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.Mere.Add(mera);
            await _unitOfWork.Complete();

            return Success(await _unitOfWork.Mere.Get(mera.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Mera meraEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var mera = await _unitOfWork.Mere.Get(id);
            if (mera == null) return Fail("Not Found");

            mera.Aktivna = meraEdit.Aktivna;
            mera.StatusMereId = meraEdit.StatusMereId;
            mera.Grupna = meraEdit.Grupna;
            mera.Oznaka = meraEdit.Oznaka;
            mera.Naziv = meraEdit.Naziv;
            mera.ZaduzenZaImplementaciju = meraEdit.ZaduzenZaImplementaciju;
            mera.RokZaImplementaciju = meraEdit.RokZaImplementaciju;

            await _unitOfWork.Complete();
            
            return Success(await _unitOfWork.Mere.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var mera = await _unitOfWork.Mere.Get(id);
            if (mera == null) return Fail("Not Found");

            _unitOfWork.Mere.Remove(mera);
            await _unitOfWork.Complete();
            return Success(mera);
        }

    }
}
