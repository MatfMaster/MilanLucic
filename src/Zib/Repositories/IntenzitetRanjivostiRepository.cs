using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace Zib.Repositories
{
    public class IntenzitetRanjivostiRepository : Repository<IntenzitetRanjivosti>, IIntenzitetRanjivostiRepository
    {
        private readonly DbSet<IntenzitetRanjivosti> _intenzitetRanjivostiSet;


        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public IntenzitetRanjivostiRepository(ApplicationDbContext context) : base(context)
        {
            //Context = context;
            _intenzitetRanjivostiSet = Context.Set<IntenzitetRanjivosti>();
        }


        public override async Task<IEnumerable<IntenzitetRanjivosti>> GetAll()
        {
            return await _intenzitetRanjivostiSet.OrderBy(ip => ip.Vrednost).ToListAsync();
        }
    }
}

