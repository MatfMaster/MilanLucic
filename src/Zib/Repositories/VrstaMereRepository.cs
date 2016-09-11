
using Common.Persistance;
using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Zib.Data;

namespace Zib.Repositories
{
    public class VrstaMereRepository: Repository<VrstaMere>, IVrstaMereRepository
    {
        //private ApplicationDbContext _context;

        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public VrstaMereRepository(ApplicationDbContext context): base(context)
        {}

    }
}
