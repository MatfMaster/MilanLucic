using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Common.Mvc;
using Zib.Models;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Route("api/[controller]")]
    public class VrsteVrednostiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public VrsteVrednostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var ret = await _unitOfWork.VrsteVrednosti.GetAllViewModel();
            return Success(ret);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]VrstaVrednosti vrstaVrednosti)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.VrsteVrednosti.Add(vrstaVrednosti);
            await _unitOfWork.Complete();

            //return Success(await _unitOfWork.VrsteVrednosti.Get(vrstaVrednosti.Id));
            return Success(await _unitOfWork.VrsteVrednosti.VrstaVrednostiPosleAzuriranja(vrstaVrednosti.Id));
        }

        [HttpPut("{id}")]
        //public IActionResult Put([FromRoute] int id, [FromBody] VrstaVrednostiTree vrstaVrednostiEdit)
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] VrstaVrednosti vrstaVrednostiEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vrstaVrednosti = await _unitOfWork.VrsteVrednosti.Get(id);
            if (vrstaVrednosti == null) return Fail("Not Found");

            vrstaVrednosti.Naziv = vrstaVrednostiEdit.Naziv;
            vrstaVrednosti.Opis = vrstaVrednostiEdit.Opis;
            vrstaVrednosti.OrganizacionaCelinaId = vrstaVrednostiEdit.OrganizacionaCelinaId;
            vrstaVrednosti.PoslovnaVrednostId = vrstaVrednostiEdit.PoslovnaVrednostId;
            vrstaVrednosti.NadredjenaKategorija = vrstaVrednostiEdit.NadredjenaKategorija;

            await _unitOfWork.Complete();

            //return Success(await _unitOfWork.VrsteVrednosti.Get(id));
            return Success(await _unitOfWork.VrsteVrednosti.VrstaVrednostiPosleAzuriranja(id));

            //var vrstaVrednostiTree = _mapper.Map<VrstaVrednostiTree>(_unitOfWork.VrsteVrednosti.Get(id));
            //vrstaVrednostiTree.Nivo = _unitOfWork.VrsteVrednosti.Nivo(vrstaVrednostiTree.Id);
            //vrstaVrednostiTree.Expanded = vrstaVrednostiEdit.Expanded;
            //return Success(vrstaVrednostiTree);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vrstaVrednosti = await _unitOfWork.VrsteVrednosti.Get(id);
            if (vrstaVrednosti == null) return Fail("Not Found");

            _unitOfWork.VrsteVrednosti.Remove(vrstaVrednosti);
            await _unitOfWork.Complete();
            return Success(vrstaVrednosti);
        }
    }
}