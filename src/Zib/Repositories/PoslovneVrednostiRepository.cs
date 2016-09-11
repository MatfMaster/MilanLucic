using Common.Persistance;
using Zib.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Zib.Data;

namespace Zib.Repositories
{
    public class PoslovneVrednostiRepository: Repository<PoslovnaVrednost>, IPoslovneVrednostiRepository
    {
        //private ApplicationDbContext _context;

        public IdentityDbContext ApplicationDbContext
        {
            get { return Context as IdentityDbContext; }
        }

        public PoslovneVrednostiRepository(ApplicationDbContext context): base(context)
        {}

    }
}
