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
    public class PretnjeController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;


        public PretnjeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

    
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //var pretnje = await _unitOfWork.Pretnje.GetAll();
            //var vrstePretnji = _unitOfWork.VrstePretnji.VrstePretnjiForNg2Select();
            //var pretnjeViewModel = new PretnjeViewModel { Pretnje = pretnje, VrstePretnji = vrstePretnji };
            //return Success(pretnjeViewModel);

            var pretnjeViewModel = await _unitOfWork.Pretnje.GetAllViewModel();
            var vrstePretnji = _unitOfWork.VrstePretnji.VrstePretnjiForNg2Select();
            return Success(new { Pretnje = pretnjeViewModel, VrstePretnji = vrstePretnji });

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PretnjaViewModel pretnjaViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);
            var pretnja = Mapper.Map<Pretnja>(pretnjaViewModel);

            _unitOfWork.Pretnje.Add(pretnja);
            await _unitOfWork.Complete();

            //return Success(pretnja);
            return Success(await _unitOfWork.Pretnje.Get(pretnja.Id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] PretnjaEdit pretnjaEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            //return NotFound(new { message = "Podatak nije nadjen!" });

            //var errors = new List<Error>();
            //errors.Add(new Error{ Property = "naziv", Message = "Greska opis 1" + "\n" + "Greska opis 2"});
            //errors.Add(new Error{ Property = "integritet", Message = "Greska integritet 1"});
            //return Fail(new {errors = errors});

            var pretnja = await _unitOfWork.Pretnje.Get(id);
            if (pretnja == null) return Fail("Not Found");

            //pretnja = _mapper.Map<Pretnja>(pretnjaEdit);

            pretnja.Naziv = pretnjaEdit.Naziv;
            pretnja.VrstaPretnjeId = pretnjaEdit.VrstaPretnjeId;
            pretnja.Poverljivost = pretnjaEdit.Poverljivost;
            pretnja.Integritet = pretnjaEdit.Integritet;
            pretnja.Raspolozivost = pretnjaEdit.Raspolozivost;

            await _unitOfWork.Complete();
            
            return Success(await _unitOfWork.Pretnje.Get(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var pretnja = await _unitOfWork.Pretnje.Get(id);
            if (pretnja == null) return Fail("Not Found");

            _unitOfWork.Pretnje.Remove(pretnja);
            await _unitOfWork.Complete();
            return Success(pretnja);
        }

    }
}
