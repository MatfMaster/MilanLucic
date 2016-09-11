using Common.Persistance;
using Zib.Models;
using Zib.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Zib.ViewModels;
using System.Linq;

namespace Zib.Repositories
{
    public class BiaRepository : Repository<ProcesServisBia>, IBiaRepository
    {
        private DbSet<ProcesServisBia> procesServisBiaSet;


        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public BiaRepository(ApplicationDbContext context) : base(context)
        {
            procesServisBiaSet = Context.Set<ProcesServisBia>();
        }

        public override async Task<ProcesServisBia> Get(int id)
        {
            return await procesServisBiaSet.
                Include(psb => psb.Dobavljaci).
                Include(psb => psb.Resursi).
                Include(psb => psb.Zaposleni).
                SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<ProcesiServisiBiaViewModel> GetAllViewModel()
        {

            var ProcesiServisiBia = await procesServisBiaSet.Include(psb => psb.Dobavljaci)
                        .Include(psb => psb.Resursi)
                        .Include(psb => psb.Zaposleni)
                        .ToListAsync();

            var Resursi = await ApplicationDbContext.Vrednosti.OrderBy(v => v.Naziv).
                            Select(v => new VrednostViewModel { Id = v.Id, Naziv = v.Naziv }).
                            ToListAsync();

            var Dobavljaci = await ApplicationDbContext.Dobavljaci.OrderBy(d => d.Naziv)
                        .Select(d => new DobavljaciSelect { Id = d.Id, Naziv = d.Naziv })
                        .ToListAsync();
            
            var Ljudi = await ApplicationDbContext.Zaposleni.OrderBy(z => z.Prezime).ThenBy(z => z.Ime).Include(z => z.OrganizacionaCelina).
                            Select(z => new ZaposleniBiaViewModel { Id = z.Id, Pime = $"{z.Ime} {z.Prezime}", OrganizacionaCelina = z.OrganizacionaCelina.Naziv}).
                            ToListAsync();


            var procesiServisiBiaViewModel = new ProcesiServisiBiaViewModel
            {
                ProcesiServisiBia = ProcesiServisiBia,
                Resursi = Resursi,
                Dobavljaci = Dobavljaci,
                Ljudi = Ljudi

                //ProcesiServisiBia = await procesServisBiaSet.Include(psb => psb.Dobavljaci).Include(psb => psb.Resursi).Include(psb => psb.ProcesServisBia_Zaposleni).ToListAsync(),
                //Resursi = await ApplicationDbContext.Vrednosti.ToListAsync(),
                //Dobavljaci = await ApplicationDbContext.Dobavljaci.OrderBy(d => d.Naziv).Select(d => new DobavljaciSelect { Id = d.Id, Naziv = d.Naziv }).ToListAsync(),
                //Ljudi = await ApplicationDbContext.Zaposleni.OrderBy(z => z.Prezime).ThenBy(z => z.Ime).ToListAsync()
            };

            return procesiServisiBiaViewModel;
        }
    }
}

