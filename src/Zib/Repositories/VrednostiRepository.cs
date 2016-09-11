using Common.Persistance;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zib.Data;
using Zib.Models;

namespace Zib.Repositories
{
    public class VrednostiRepository : Repository<Vrednost>, IVrednostiRepository
    {
        public ApplicationDbContext ApplicationContext => Context as ApplicationDbContext;

        public VrednostiRepository(ApplicationDbContext context): base(context)
        { }

        public override async Task<Vrednost> Get(int id)
        {
            return await ApplicationContext.Vrednosti.
                Include(v => v.ProcesServisBia_Vrednosti).
                ThenInclude(psbv => psbv.ProcesServisBia).
                SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IList<Vrednost>> VrednostiZaVrstuVrednosti(int vrstaVrednostiId)
        {
            return await ApplicationContext.Vrednosti.Where(v => v.VrstaVrednostiId == vrstaVrednostiId).
                Include(v => v.ProcesServisBia_Vrednosti).ThenInclude(psbv => psbv.ProcesServisBia).
                OrderBy(v => v.Naziv).
                ToListAsync();
        }


    }
}
