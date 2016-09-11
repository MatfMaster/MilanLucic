using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace Zib.Repositories
{
    public class IntenzitetPretnjiRepository : Repository<IntenzitetPretnje>, IIntenzitetPretnjiRepository
    {
        private DbSet<IntenzitetPretnje> intenzitetPretnjiSet;


        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public IntenzitetPretnjiRepository(ApplicationDbContext context) : base(context)
        {
            //Context = context;
            intenzitetPretnjiSet = Context.Set<IntenzitetPretnje>();
        }

        //public override async Task<IntenzitetPretnje> Get(int id)
        //{
        //    return await intenzitetPretnjiSet.SingleOrDefaultAsync(p => p.Id == id);
        //}

        public override async Task<IEnumerable<IntenzitetPretnje>> GetAll()
        {
            return await intenzitetPretnjiSet.OrderBy(ip => ip.Vrednost).ToListAsync();
        }
    }
}

