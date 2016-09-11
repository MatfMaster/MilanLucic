using Common.Mvc;
using Zib.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Threading.Tasks;

namespace Zib.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BiaController : AppController
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public BiaController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var procesiServisiBia = await _unitOfWork.ProcesiServisiBia.GetAllViewModel();
            return Success(procesiServisiBia);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ProcesServisBia procesServisBia)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            _unitOfWork.ProcesiServisiBia.Add(procesServisBia);
            await _unitOfWork.Complete();
            return Success(procesServisBia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] ProcesServisBia procesServisBiaEdit)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            //Thread.Sleep(2000);
            var procesServisBia = await _unitOfWork.ProcesiServisiBia.Get(id);
            if (procesServisBia == null) return Fail("Not Found");

            procesServisBia.Naziv = procesServisBiaEdit.Naziv;
            procesServisBia.Kritican = procesServisBiaEdit.Kritican;
            procesServisBia.MogucnostRucnogObavljanja = procesServisBiaEdit.MogucnostRucnogObavljanja;
            procesServisBia.FinansijskiGubitak = procesServisBiaEdit.FinansijskiGubitak;
            procesServisBia.FinansijskiGubitakIznos = procesServisBiaEdit.FinansijskiGubitakIznos;
            procesServisBia.ReputacioniGubitak = procesServisBiaEdit.ReputacioniGubitak;
            procesServisBia.ReputacioniGubitakIznos = procesServisBiaEdit.ReputacioniGubitakIznos;
            procesServisBia.ZakonskaObaveza = procesServisBiaEdit.ZakonskaObaveza;
            procesServisBia.ZakonskaObavezaIznos = procesServisBiaEdit.ZakonskaObavezaIznos;
            procesServisBia.UgovornaObaveza = procesServisBiaEdit.UgovornaObaveza;
            procesServisBia.UgovornaObavezaIznos = procesServisBiaEdit.UgovornaObavezaIznos;
            procesServisBia.NeiskoriscenaPrilika = procesServisBiaEdit.NeiskoriscenaPrilika;
            procesServisBia.NeiskoriscenaPrilikaIznos = procesServisBiaEdit.NeiskoriscenaPrilikaIznos;
            procesServisBia.Rto = procesServisBiaEdit.Rto;
            procesServisBia.Rpo = procesServisBiaEdit.Rpo;
            procesServisBia.CiljaniNivoOporavka = procesServisBiaEdit.CiljaniNivoOporavka;

            await _unitOfWork.Complete();
            return Success(procesServisBia);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var procesServisBia = await _unitOfWork.ProcesiServisiBia.Get(id);
            if (procesServisBia == null) return Fail("Not Found");

            _unitOfWork.ProcesiServisiBia.Remove(procesServisBia);
            await _unitOfWork.Complete();
            return Success(procesServisBia);
        }

        [HttpPost]
        [Route("toggledobavljac")]
        public async Task<IActionResult> ToggleDobavljac([FromBody] ToggleDobavljacViewModel toggleDobavljacViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var procesServisBia = await _unitOfWork.ProcesiServisiBia.Get(toggleDobavljacViewModel.ProcesServisId);
            if (procesServisBia == null) return Fail("Ne postoji Proces / Servis");

            var dobavljac = await _unitOfWork.Dobavljaci.Get(toggleDobavljacViewModel.DobavljacId);
            if (dobavljac == null) return Fail("Ne postoji dobavljac");

            var procesServisBiaDobavljac = new ProcesServisBia_Dobavljac
            {
                ProcesServisBiaId = toggleDobavljacViewModel.ProcesServisId,
                DobavljacId = toggleDobavljacViewModel.DobavljacId
            };

            // Ako dobavljac ucestvuje u Procesu / Servisu brisem ga
            if (procesServisBia.Dobavljaci.Exists(d => d.DobavljacId == toggleDobavljacViewModel.DobavljacId &&
                                                       d.ProcesServisBiaId == toggleDobavljacViewModel.ProcesServisId))
            {
                int i = 0;
                foreach (var dobavljacBia in procesServisBia.Dobavljaci)
                {
                    if (dobavljacBia.ProcesServisBiaId == toggleDobavljacViewModel.ProcesServisId &&
                        dobavljacBia.DobavljacId == toggleDobavljacViewModel.DobavljacId)
                    {
                        procesServisBia.Dobavljaci.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem doabvljaca u Proces / Servis
            {
                procesServisBia.Dobavljaci.Add(procesServisBiaDobavljac);
            }

            await _unitOfWork.Complete();
            return Success();
        }

        [HttpPost]
        [Route("togglezaposleni")]
        public async Task<IActionResult> ToggleZaposleni([FromBody] ToggleZaposleniViewModel toggleZaposleniViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var procesServisBia = await _unitOfWork.ProcesiServisiBia.Get(toggleZaposleniViewModel.ProcesServisId);
            if (procesServisBia == null) return Fail("Ne postoji Proces / Servis");

            var zaposleni = await _unitOfWork.Zaposleni.Get(toggleZaposleniViewModel.ZaposleniId);
            if (zaposleni == null) return Fail("Ne postoji zaposleni");

            var procesServisBiaZaposleni = new ProcesServisBia_Zaposleni
            {
                ProcesServisBiaId = toggleZaposleniViewModel.ProcesServisId,
                ZaposleniId = toggleZaposleniViewModel.ZaposleniId
            };

            // Ako zaposleni ucestvuje u Procesu / Servisu brisem ga
            if (procesServisBia.Zaposleni.Exists(z => z.ZaposleniId == toggleZaposleniViewModel.ZaposleniId &&
                                                       z.ProcesServisBiaId == toggleZaposleniViewModel.ProcesServisId))
            {
                int i = 0;
                foreach (var zaposleniBia in procesServisBia.Zaposleni)
                {
                    if (zaposleniBia.ProcesServisBiaId == toggleZaposleniViewModel.ProcesServisId &&
                        zaposleniBia.ZaposleniId == toggleZaposleniViewModel.ZaposleniId)
                    {
                        procesServisBia.Zaposleni.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem zaposlenog u Proces / Servis
            {
                procesServisBia.Zaposleni.Add(procesServisBiaZaposleni);
            }

            await _unitOfWork.Complete();
            return Success();
        }

        [HttpPost]
        [Route("toggleresursi")]
        public async Task<IActionResult> ToggleVrednost([FromBody] ToggleVrednostViewModel toggleVrednostViewModel)
        {
            if (!ModelState.IsValid)
                return Fail(ModelState);

            var procesServisBia = await _unitOfWork.ProcesiServisiBia.Get(toggleVrednostViewModel.ProcesServisId);
            if (procesServisBia == null) return Fail("Ne postoji Proces / Servis");

            var vrednost = await _unitOfWork.Vrednosti.Get(toggleVrednostViewModel.ResursId);
            if (vrednost == null) return Fail("Ne postoji vrednost");

            var procesServisBiaVrednost = new ProcesServisBia_Vrednost
            {
                ProcesServisBiaId = toggleVrednostViewModel.ProcesServisId,
                VrednostId = toggleVrednostViewModel.ResursId
            };

            // Ako vrednost ucestvuje u Procesu / Servisu brisem ga
            if (procesServisBia.Resursi.Exists(z => z.VrednostId == toggleVrednostViewModel.ResursId &&
                                                       z.ProcesServisBiaId == toggleVrednostViewModel.ProcesServisId))
            {
                int i = 0;
                foreach (var vrednostBia in procesServisBia.Resursi)
                {
                    if (vrednostBia.ProcesServisBiaId == toggleVrednostViewModel.ProcesServisId &&
                        vrednostBia.VrednostId == toggleVrednostViewModel.ResursId)
                    {
                        procesServisBia.Resursi.RemoveAt(i);
                        break;
                    }
                    i++;
                }
            }
            else // dodajem zaposlenog u Proces / Servis
            {
                procesServisBia.Resursi.Add(procesServisBiaVrednost);
            }

            await _unitOfWork.Complete();
            return Success();
        }


    }

    public class ToggleDobavljacViewModel
    {
        public int ProcesServisId { get; set; }
        public int DobavljacId { get; set; }
    }

    public class ToggleZaposleniViewModel
    {
        public int ProcesServisId { get; set; }
        public int ZaposleniId { get; set; }
    }

    public class ToggleVrednostViewModel
    {
        public int ProcesServisId { get; set; }
        public int ResursId { get; set; }
    }

}
