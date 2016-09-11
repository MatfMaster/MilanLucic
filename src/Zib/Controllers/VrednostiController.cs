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
    public class VrednostiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public VrednostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        //[Route("api/vrednosti")]
        public async Task<IActionResult> Get()
        {
            //var ret = await _unitOfWork.Vrednosti.GetAllViewModel();
            var ret = new VrednostiViewModel
            {
                VrsteVrednosti = _unitOfWork.VrsteVrednosti.GetVrsteVrednostiForSelect(),
                VlasniciVrednosti = await _unitOfWork.VlasniciVrednosti.VlasniciVrednostiZaSelect(),
                OrganizacioneCeline = await _unitOfWork.OrganizacioneCeline.GetAll(),
                PoslovneVrednosti = await _unitOfWork.PoslovneVrednosti.GetAll(),
                VrsteVrednostiHijerarhija = _unitOfWork.VrsteVrednosti.VrsteVrednostiHijerarhija()
            };
            return Success(ret);
        }

        [HttpGet]
        [Route("/api/vrednosti/VrednostiZaVrstuVrednosti/{id}")]
        public async Task<IActionResult> VrednostiZaVrstuVrednosti(int id)
        {
            var vrednosti = await _unitOfWork.Vrednosti.VrednostiZaVrstuVrednosti(id);
            return Success(new {Vrednosti = vrednosti});
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Vrednost vrednost)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.Vrednosti.Add(vrednost);
            await _unitOfWork.Complete();

            return Success(await _unitOfWork.Vrednosti.Get(vrednost.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Vrednost vrednostEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);


            var vrednost = await _unitOfWork.Vrednosti.Get(id);
            if (vrednost == null) return Fail("Not Found");


            vrednost.Naziv = vrednostEdit.Naziv;
            vrednost.Opis = vrednostEdit.Opis;
            vrednost.OrganizacionaCelinaId = vrednostEdit.OrganizacionaCelinaId;
            vrednost.PoslovnaVrednostId = vrednostEdit.PoslovnaVrednostId;
            vrednost.VlasnikVrednostiId = vrednostEdit.VlasnikVrednostiId;
            vrednost.VrstaVrednostiId = vrednostEdit.VrstaVrednostiId;


            await _unitOfWork.Complete();
            var ret = await _unitOfWork.Vrednosti.Get(id);
            return Success(ret);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vrednost = await _unitOfWork.Vrednosti.Get(id);
            if (vrednost == null) return Fail("Not Found");

            _unitOfWork.Vrednosti.Remove(vrednost);
            await _unitOfWork.Complete();
            return Success(vrednost);
        }

    }
}
