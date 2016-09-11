using Common.Persistance;
using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Zib.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Zib.Repositories
{
    public class RanjivostiRepository: Repository<Ranjivost>, IRanjivostiRepository
    {
        //private ApplicationDbContext _context;

        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public RanjivostiRepository(ApplicationDbContext context): base(context)
        {}

        public override async Task<IEnumerable<Ranjivost>> GetAll()
        {
            return await Context.Set<Ranjivost>().OrderBy(r => r.Opis).ToListAsync();
        }
    }
}
