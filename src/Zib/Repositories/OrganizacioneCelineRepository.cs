using Common.Persistance;
using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Zib.Data;

namespace Zib.Repositories
{
    public class OrganizacioneCelineRepository : Repository<OrganizacionaCelina>, IOrganizacioneCelineRepository
    {
        //private ApplicationDbContext _context;

        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public OrganizacioneCelineRepository(ApplicationDbContext context): base(context)
        {}

    }
}
