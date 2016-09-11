using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Zib.ViewModels;
using System.Linq;
using AutoMapper.QueryableExtensions;

namespace Zib.Repositories
{
    //public class PretnjeRepository: Repository<Pretnja>, IPretnjeRepository
    public class PretnjeRepository : Repository<Pretnja>, IPretnjeRepository
    {
        private DbSet<Pretnja> pretnjeSet;

        //public IdentityDbContext Context { get; private set; }

        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public PretnjeRepository(ApplicationDbContext context) : base(context)
        {
            //Context = context;
            pretnjeSet = Context.Set<Pretnja>();
        }

        public override async Task<Pretnja> Get(int id)
        {
            return await pretnjeSet.Include(p => p.VrstaPretnje).Include(p => p.PretnjeRanjivosti).SingleOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<Pretnja>> GetAll()
        {
            return await pretnjeSet.Include(p => p.VrstaPretnje).Include(p => p.PretnjeRanjivosti).ToListAsync();
        }

        public async Task<IEnumerable<PretnjaViewModel>> GetAllViewModel()
        {
            return await pretnjeSet.
                Include(p => p.VrstaPretnje).ProjectTo<PretnjaViewModel>().ToListAsync();

            //return await pretnjeSet.
            //    Include(p => p.VrstaPretnje).
            //    Select(p => new PretnjaViewModel
            //    {
            //        Id = p.Id,
            //        Naziv = p.Naziv,
            //        Integritet = p.Integritet,
            //        Poverljivost = p.Poverljivost,
            //        Raspolozivost = p.Raspolozivost,
            //        VrstaPretnjeId = p.VrstaPretnjeId,
            //        VrstaPretnje = p.VrstaPretnje
            //    }).
            //    ToListAsync();
        }
    }
}

