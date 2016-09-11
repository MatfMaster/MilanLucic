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
    public class VlasniciVrednostiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public VlasniciVrednostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vlasniciVrednosti = await _unitOfWork.VlasniciVrednosti.GetAll();
            var organizacioneCeline = await _unitOfWork.OrganizacioneCeline.GetAll();
            var vlasniciVrednostiViewModel = new VlasniciVrednostiViewModel() { VlasniciVrednosti = vlasniciVrednosti, OrganizacioneCeline = organizacioneCeline };
            return Success(vlasniciVrednostiViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]VlasnikVrednosti vlasnikVrednosti)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.VlasniciVrednosti.Add(vlasnikVrednosti);
            await _unitOfWork.Complete();

            //return Success(pretnja);
            return Success(await _unitOfWork.VlasniciVrednosti.Get(vlasnikVrednosti.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] VlasnikVrednosti vlasnikVrednostiEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vlasnikVrednosti = await _unitOfWork.VlasniciVrednosti.Get(id);
            if (vlasnikVrednosti == null) return Fail("Not Found");


            vlasnikVrednosti.Ime = vlasnikVrednostiEdit.Ime;
            vlasnikVrednosti.Prezime = vlasnikVrednostiEdit.Prezime;
            vlasnikVrednosti.OrganizacionaCelinaId = vlasnikVrednostiEdit.OrganizacionaCelinaId;

            await _unitOfWork.Complete();
            
            return Success(await _unitOfWork.VlasniciVrednosti.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vlasnikVrednosti = await _unitOfWork.VlasniciVrednosti.Get(id);
            if (vlasnikVrednosti == null) return Fail("Not Found");

            _unitOfWork.VlasniciVrednosti.Remove(vlasnikVrednosti);
            await _unitOfWork.Complete();
            return Success(vlasnikVrednosti);
        }

    }
}
