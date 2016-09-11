using Common.Mvc;
using Zib.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class OrganizacioneCelineController : AppController
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public OrganizacioneCelineController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //throw new System.Exception("Namerna greska");
            var organizacioneCeline = await _unitOfWork.OrganizacioneCeline.GetAll();
            return Success(organizacioneCeline);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]OrganizacionaCelina organizacionaCelina)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.OrganizacioneCeline.Add(organizacionaCelina);
            await _unitOfWork.Complete();
            return Success(organizacionaCelina);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] OrganizacionaCelina organinizaCelinaEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var organizacionaCelina = await _unitOfWork.OrganizacioneCeline.Get(id);
            if (organizacionaCelina == null) return Fail("Not Found");

            organizacionaCelina.Naziv = organinizaCelinaEdit.Naziv;
            await _unitOfWork.Complete();
            return Success(organizacionaCelina);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var organizacionaCelina = await _unitOfWork.OrganizacioneCeline.Get(id);
            if (organizacionaCelina == null) return Fail("Not Found");

            _unitOfWork.OrganizacioneCeline.Remove(organizacionaCelina);
            await _unitOfWork.Complete();
            return Success(organizacionaCelina);
        }

    }
}
