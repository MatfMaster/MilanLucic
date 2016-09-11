using Common.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Controllers
{
    [Route("api/[controller]")]
    public class PretnjeRanjivostiController : AppController
    {
        private IUnitOfWork _unitOfWork;

        public PretnjeRanjivostiController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pretnje = await _unitOfWork.Pretnje.GetAllViewModel();
            var ranjivosti = await _unitOfWork.Ranjivosti.GetAll();
            var mere = await _unitOfWork.Mere.GetAktivneMereZaProcenuRizika();

            var pretnjeRanjivostiViewModel = new PretnjeRanjivostiViewModel { Pretnje = pretnje, Ranjivosti = ranjivosti, Mere = mere };

            return Success(pretnjeRanjivostiViewModel);
        }

        [HttpPost]
        [Route("toggleranjivost")]
        public async Task<IActionResult> ToggleRanjivost([FromBody] ToggleRanjivostViewModel toggleRanjivostViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var pretnja = await _unitOfWork.Pretnje.Get(toggleRanjivostViewModel.PretnjaId);
            if (pretnja == null) return Fail("Ne postoji pretnja");

            var ranjivost = await _unitOfWork.Ranjivosti.Get(toggleRanjivostViewModel.RanjivostId);
            if (ranjivost == null) return Fail("Ne postoji ranjivost");


            // Ako dobavljac ucestvuje u Procesu / Servisu brisem ga
            if (pretnja.PretnjeRanjivosti.Exists(p => p.PretnjaId == toggleRanjivostViewModel.PretnjaId &&
                                                       p.RanjivostId == toggleRanjivostViewModel.RanjivostId))
            {
                int i = 0;
                foreach (var rajnivost in pretnja.PretnjeRanjivosti)
                {
                    if (rajnivost.PretnjaId == toggleRanjivostViewModel.PretnjaId &&
                        rajnivost.RanjivostId == toggleRanjivostViewModel.RanjivostId)
                    {
                        pretnja.PretnjeRanjivosti.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem doabvljaca u Proces / Servis
            {
                var pretnjaRanjivost = new PretnjeRanjivosti
                {
                    PretnjaId = toggleRanjivostViewModel.PretnjaId,
                    RanjivostId = toggleRanjivostViewModel.RanjivostId
                };

                pretnja.PretnjeRanjivosti.Add(pretnjaRanjivost);
            }

            await _unitOfWork.Complete();
            return Success();
        }

        [HttpPost]
        [Route("ranjivostizapretnju/{id}")]
        public async Task<IActionResult> RanjivostiZaPretnju(int id)
        {
            var ranjivosti = await _unitOfWork.PretnjeRanjivosti.RanjivostiZaPretnju(id);
            return Success(ranjivosti);
        }


        [HttpPost]
        [Route("dodajRanjivostPretnji")]
        public async Task<IActionResult> DodajRanjivostPretnji([FromBody] ToggleRanjivostViewModel toggleRanjivostViewModel)
        {
            var pretnja = await _unitOfWork.Pretnje.Get(toggleRanjivostViewModel.PretnjaId);
            if (pretnja == null) return Fail("Ne postoji pretnja");

            var pretnjaRanjivost = new PretnjeRanjivosti
            {
                PretnjaId = toggleRanjivostViewModel.PretnjaId,
                RanjivostId = toggleRanjivostViewModel.RanjivostId
            };

            pretnja.PretnjeRanjivosti.Add(pretnjaRanjivost);
            await _unitOfWork.Complete();

            var ranjivosti = await _unitOfWork.PretnjeRanjivosti.RanjivostiZaPretnju(toggleRanjivostViewModel.PretnjaId);
            return Success(ranjivosti);
        }

        [HttpPost]
        [Route("obrisiranjivost")]
        public async Task<IActionResult> ObrisiRanjivost([FromBody] ToggleRanjivostViewModel toggleRanjivostViewModel)
        {
            var pretnja = await _unitOfWork.Pretnje.Get(toggleRanjivostViewModel.PretnjaId);
            if (pretnja == null) return Fail("Ne postoji pretnja");

            int i = 0;
            foreach (var rajnivost in pretnja.PretnjeRanjivosti)
            {
                if (rajnivost.PretnjaId == toggleRanjivostViewModel.PretnjaId && rajnivost.RanjivostId == toggleRanjivostViewModel.RanjivostId)
                {
                    pretnja.PretnjeRanjivosti.RemoveAt(i);
                    break;
                }
                i++;
            }

            await _unitOfWork.Complete();

            var ranjivosti = await _unitOfWork.PretnjeRanjivosti.RanjivostiZaPretnju(toggleRanjivostViewModel.PretnjaId);
            return Success(ranjivosti);
        }

        [HttpGet]
        [Route("defaultMereZaPretnjuRanjivost/{id}")]
        public async Task<IActionResult> DefaultMereZaPretnjuRanjivost(int id)
        {
            var defaultMere = await _unitOfWork.PretnjeRanjivosti.GetDefaultMere(id);
            if (defaultMere == null)
                defaultMere = new List<PretnjeRanjivosti_DefaultMere>();

            return Success(defaultMere);
        }

        [HttpPost]
        [Route("toggleprimenjenamera")]
        public async Task<IActionResult> ToggleDefaultMere([FromBody] ToggleDefaultMere toggleDefaultMere)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            //var pretnja = await _unitOfWork.Pretnje.Get(toggleDefaultMere.PretnjaId);
            //if (pretnja == null) return Fail("Ne postoji pretnja");

            //var ranjivost = await _unitOfWork.Ranjivosti.Get(toggleDefaultMere.RanjivostId);
            //if (ranjivost == null) return Fail("Ne postoji ranjivost");

            var pretnjaRanjivost = await _unitOfWork.PretnjeRanjivosti.Get(toggleDefaultMere.PretnjaRanjivostId);
            if (pretnjaRanjivost == null) return Fail("Ne postoji kombinacija pretnja/ranjivost");

            // Ako postoji default mera za pretnju ranjivost brisem je
            if (pretnjaRanjivost.PretnjeRanjivosti_DefaultMere.Exists(prdm => prdm.MeraId == toggleDefaultMere.MeraId))
            {
                int i = 0;
                foreach (var primenjenaMera in pretnjaRanjivost.PretnjeRanjivosti_DefaultMere)
                {
                    if (primenjenaMera.MeraId == toggleDefaultMere.MeraId)
                    {
                        pretnjaRanjivost.PretnjeRanjivosti_DefaultMere.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem doabvljaca u Proces / Servis
            {
                var pretnjeRanjivosti_DefaultMere = new PretnjeRanjivosti_DefaultMere
                {
                    PretnjeRanjivostiId = pretnjaRanjivost.Id,
                    MeraId = toggleDefaultMere.MeraId
                };

                pretnjaRanjivost.PretnjeRanjivosti_DefaultMere.Add(pretnjeRanjivosti_DefaultMere);
            }
            await _unitOfWork.Complete();

            var defaultMere = await _unitOfWork.PretnjeRanjivosti.GetDefaultMere(pretnjaRanjivost.Id);
            return Success(defaultMere);
        }

    }
}