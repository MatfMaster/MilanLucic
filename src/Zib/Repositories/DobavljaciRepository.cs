using Common.Persistance;
using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Zib.Data;

namespace Zib.Repositories
{
    public class DobavljaciRepository: Repository<Dobavljac>, IDobavljaciRepository
    {

        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public DobavljaciRepository(ApplicationDbContext context): base(context)
        {}

    }
}
