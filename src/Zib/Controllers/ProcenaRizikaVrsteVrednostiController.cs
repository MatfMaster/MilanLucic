using System.Threading.Tasks;
using AutoMapper;
using Common.Mvc;
using Microsoft.AspNetCore.Mvc;
using Zib.Models;
using Zib.ViewModels;
using System.Linq;
using System.Collections.Generic;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProcenaRizikaVrsteVrednostiController : AppController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public ProcenaRizikaVrsteVrednostiController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            var procenaRizizkaVrsteVrednostiViewModel = new ProcenaRizikaVrsteVrednostiViewModel
            {
                PretnjeRanjivosti = await _unitOfWork.PretnjeRanjivosti.GetPretnjeRanjivostiZaProcenuRizika(),
                VrsteVrednostiHijerarhija = _unitOfWork.VrsteVrednosti.VrsteVrednostiHijerarhija(),
                Mere = await _unitOfWork.Mere.GetAktivneMereZaProcenuRizika(),
                IntenzitetPretnji = await _unitOfWork.IntenzitetPretnji.GetAll(),
                IntenzitetRanjivosti = await _unitOfWork.IntenzitetRanjivosti.GetAll()
            };

            return Success(procenaRizizkaVrsteVrednostiViewModel);
        }

        [HttpGet]
        [Route("pretnjeranjivostizavrstuvrednosti/{id}")]
        public async Task<IActionResult> PretnjeRanjivostiZaVrstuVrednosti(int id) {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var pretnjeRanjivosti = await _unitOfWork.PretnjeRanjivosti.PretnjeRanjivostiZaVrstuVrednosti(id);
            return Success(pretnjeRanjivosti);

        }

        [HttpPost]
        [Route("togglepretnjaranjivost")]
        public async Task<IActionResult> TogglePretnjaRanjivost([FromBody] TogglePretnjaRanjivostViewModel togglePretnjaRanjivostViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vrstaVrednosti = await _unitOfWork.VrsteVrednosti.Get(togglePretnjaRanjivostViewModel.VrstaVrednostiId);
            if (vrstaVrednosti == null) return Fail("Ne postoji vrsta vrednosti");

            var pretnjaRanjivost = await _unitOfWork.PretnjeRanjivosti.Get(togglePretnjaRanjivostViewModel.PretnjaRanjivostId);
            if (pretnjaRanjivost == null) return Fail("Ne postoji pretnja / ranjivost");

            // Ako PretnjaRanjivost ucestvuje u VrstiVrednosti brisem je
            if (vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti.Exists(x => x.VrstaVrednostiId == togglePretnjaRanjivostViewModel.VrstaVrednostiId &&
                                                       x.PretnjaRanjivostId == togglePretnjaRanjivostViewModel.PretnjaRanjivostId))
            {
                var i = 0;
                foreach (var _pretnjaRanjivost in vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti)
                {
                    if (_pretnjaRanjivost.PretnjaRanjivostId == togglePretnjaRanjivostViewModel.PretnjaRanjivostId &&
                        _pretnjaRanjivost.VrstaVrednostiId == togglePretnjaRanjivostViewModel.VrstaVrednostiId)
                    {
                        vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem PretnjuRanjivost u VrstuVrednsti
            {
                var vrstaVrednostiPretnjaRanjivost = new VrsteVrednosti_PretnjeRanjivosti
                {
                    VrstaVrednostiId = togglePretnjaRanjivostViewModel.VrstaVrednostiId,
                    PretnjaRanjivostId = togglePretnjaRanjivostViewModel.PretnjaRanjivostId
                };

                vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti.Add(vrstaVrednostiPretnjaRanjivost);
            }

            await _unitOfWork.Complete();
            var pretnjeRanjivosti = await _unitOfWork.PretnjeRanjivosti.PretnjeRanjivostiZaVrstuVrednosti(togglePretnjaRanjivostViewModel.VrstaVrednostiId);
            return Success(pretnjeRanjivosti);
        }

        [HttpPost]
        [Route("toggleprimenjenamera")]
        public async Task<IActionResult> TogglePrimenjenaMera([FromBody] TogglePrimenjenaMeraViewModel togglePrimenjenaMeraViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var vrstaVrednosti_PretnjaRanjivost = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(togglePrimenjenaMeraViewModel.PretnjaRanjivostId);
            if (vrstaVrednosti_PretnjaRanjivost == null) return Fail("Ne postoji kombinacija pretnja / ranjivost za vrstu vrednosti");

            var primenjenaMera = await _unitOfWork.Mere.Get(togglePrimenjenaMeraViewModel.MeraId);
            if (primenjenaMera == null) return Fail("Ne postoji mera");

            // Ako je mera vec primenjena brisem je
            if (vrstaVrednosti_PretnjaRanjivost.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.Exists(x => x.MeraId == togglePrimenjenaMeraViewModel.MeraId && x.VrstaVrednosti_PretnjaRanjivostId == togglePrimenjenaMeraViewModel.PretnjaRanjivostId))
            {
                var i = 0;
                foreach (var vvprpm in vrstaVrednosti_PretnjaRanjivost.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere)
                {
                    if (vvprpm.MeraId == togglePrimenjenaMeraViewModel.MeraId && vvprpm.VrstaVrednosti_PretnjaRanjivostId == togglePrimenjenaMeraViewModel.PretnjaRanjivostId)
                    {
                        vrstaVrednosti_PretnjaRanjivost.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem Meru u VrstuVrednosti_PretnjuRanjivost
            {
                var vrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere = new VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere
                {
                    MeraId = togglePrimenjenaMeraViewModel.MeraId,
                    VrstaVrednosti_PretnjaRanjivostId = togglePrimenjenaMeraViewModel.PretnjaRanjivostId
                };

                vrstaVrednosti_PretnjaRanjivost.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.Add(vrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere);
            }

            await _unitOfWork.Complete();
            //var primenjeneMere = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(togglePrimenjenaMeraViewModel.PretnjaRanjivostId);
            //return Success(primenjeneMere.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere);
            var primenjeneMere = await PrimenjeneMereZaUcesnike(togglePrimenjenaMeraViewModel.PretnjaRanjivostId);
            return Success(primenjeneMere);

        }

        [HttpGet]
        [Route("primenjenemerezapretnjeranjivostizavrstuvrednosti/{id}")]
        public async Task<IActionResult> PrimenjeneMereZaPretnjeRanjivostiZaVrstuVrednosti(int id)
        {
            //var vrstaVrednostiPretnjeRanjivosti = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(id);
            //var primenjeneMere = vrstaVrednostiPretnjeRanjivosti.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.Select(x => new { Id = x.MeraId}).ToList();
            var primenjeneMere = await PrimenjeneMereZaUcesnike(id);
            if (primenjeneMere == null)
                primenjeneMere = new List<IdViewModel>();
            return Success(primenjeneMere);
        }

        [HttpPost]
        [Route("procenarizika")]
        public async Task<IActionResult> ProcenaRizikaDodaj([FromBody] ProcenaRizikaViewModel procenaRizika)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            //var vrstaVrednosti_PretnjaRanjivost = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(p);
            //if (vrstaVrednosti_PretnjaRanjivost == null) return Fail("Ne postoji kombinacija pretnja / ranjivost za vrstu vrednosti");

            var vrstaVrednosti = await _unitOfWork.VrsteVrednosti.Get(procenaRizika.VrstaVrednostiId);
            if (vrstaVrednosti == null) return Fail("Ne postoji vrsta vrednosti");

            var vrstaVrednostiPretnjaRanjivost = new VrsteVrednosti_PretnjeRanjivosti
            {
                VrstaVrednostiId = procenaRizika.VrstaVrednostiId,
                PretnjaRanjivostId = procenaRizika.PretnjaRanjivostId,
                PretnjaPreId = procenaRizika.PretnjaPre,
                PretnjaPosleId = procenaRizika.PretnjaPosle,
                RanjivostPreId = procenaRizika.RanjivostPre,
                RanjivostPosleId = procenaRizika.RanjivostPosle

            };
            var pretnjaRanjivost = await _unitOfWork.PretnjeRanjivosti.Get(procenaRizika.PretnjaRanjivostId);
            foreach (var primenjenaMera in pretnjaRanjivost.PretnjeRanjivosti_DefaultMere)
            {
                vrstaVrednostiPretnjaRanjivost.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.Add(
                    new VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere
                    {
                        MeraId = primenjenaMera.MeraId
                    }
                );
            }

            vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti.Add(vrstaVrednostiPretnjaRanjivost);
            await _unitOfWork.Complete();

            var pretnjeRanjivosti = await _unitOfWork.PretnjeRanjivosti.PretnjeRanjivostiZaVrstuVrednosti(vrstaVrednosti.Id);
            return Success(pretnjeRanjivosti);


//            return Success(vrstaVrednostiPretnjaRanjivost);

        }

        [HttpPut]
        [Route("procenarizika")]
        public async Task<IActionResult> ProcenaRizikaAzuriraj([FromBody] ProcenaRizikaViewModel procenaRizika)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);
            //var vrstaVrednosti_PretnjaRanjivost = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(p);
            //if (vrstaVrednosti_PretnjaRanjivost == null) return Fail("Ne postoji kombinacija pretnja / ranjivost za vrstu vrednosti");

            var vrstaVrednosti = await _unitOfWork.VrsteVrednosti.Get(procenaRizika.VrstaVrednostiId);
            if (vrstaVrednosti == null) return Fail("Ne postoji vrsta vrednosti");

            VrsteVrednosti_PretnjeRanjivosti vrsteVrednosti_PretnjeRanjivosti = null;
            foreach (var vrstaVrednostiPretnjaRanjivost in vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti)
            {
                if (vrstaVrednostiPretnjaRanjivost.PretnjaRanjivostId == procenaRizika.PretnjaRanjivostId) {
                    vrsteVrednosti_PretnjeRanjivosti = vrstaVrednostiPretnjaRanjivost;
                    break;
                }
            }
            if (vrsteVrednosti_PretnjeRanjivosti == null)
                return Fail("Ne postoji kombinacija pretnja / ranjivost za vrstu vrednosti");


            vrsteVrednosti_PretnjeRanjivosti.PretnjaPreId = procenaRizika.PretnjaPre;
            vrsteVrednosti_PretnjeRanjivosti.PretnjaPosleId = procenaRizika.PretnjaPosle;
            vrsteVrednosti_PretnjeRanjivosti.RanjivostPreId = procenaRizika.RanjivostPre;
            vrsteVrednosti_PretnjeRanjivosti.RanjivostPosleId = procenaRizika.RanjivostPosle;

//            vrstaVrednosti.VrsteVrednosti_PretnjeRanjivosti.Add(vrstaVrednostiPretnjaRanjivost);
            await _unitOfWork.Complete();

            var pretnjeRanjivosti = await _unitOfWork.PretnjeRanjivosti.PretnjeRanjivostiZaVrstuVrednosti(vrstaVrednosti.Id);
            return Success(pretnjeRanjivosti);
        }


        /**
         * Privatne Metode
         */

        private async Task<IList<IdViewModel>> PrimenjeneMereZaUcesnike(int id)
        {
            var vrstaVrednostiPretnjeRanjivosti = await _unitOfWork.VrsteVrednosti_PretnjeRanjivosti.Get(id);
            if (vrstaVrednostiPretnjeRanjivosti == null || vrstaVrednostiPretnjeRanjivosti.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere == null)
                return null;

            var primenjeneMere = vrstaVrednostiPretnjeRanjivosti.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere.Select(x => new IdViewModel { Id = x.MeraId }).ToList();
            return primenjeneMere;
        }
    }
}