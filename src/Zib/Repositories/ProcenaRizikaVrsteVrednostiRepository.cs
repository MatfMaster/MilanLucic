using Microsoft.EntityFrameworkCore;
using Zib.Data;

namespace Zib.Repositories
{
    public class ProcenaRizikaVrsteVrednostiRepository : IProcenaRizikaVrsteVrednostiRepository
    {
        protected readonly DbContext Context;
        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public ProcenaRizikaVrsteVrednostiRepository(DbContext context)
        {
            Context = context;
        }

    }
}
