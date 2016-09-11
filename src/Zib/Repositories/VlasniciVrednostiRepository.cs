using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public class VlasniciVrednostiRepository : Repository<VlasnikVrednosti>, IVlasniciVrednostiRepository
    {
        private readonly DbSet<VlasnikVrednosti> _vlasniciVrednostiSet;

        //public IdentityDbContext Context { get; private set; }

        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public VlasniciVrednostiRepository(ApplicationDbContext context) : base(context)
        {
            _vlasniciVrednostiSet = Context.Set<VlasnikVrednosti>();
        }

        public override async Task<VlasnikVrednosti> Get(int id)
        {
            return await _vlasniciVrednostiSet.Include(vv => vv.OrganizacionaCelina).SingleOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<VlasnikVrednosti>> GetAll()
        {
            return await _vlasniciVrednostiSet.Include(vv => vv.OrganizacionaCelina).ToListAsync();
        }

        public async Task<IList<VlasnikVrednostiForSelect>> VlasniciVrednostiZaSelect()
        {
            return await _vlasniciVrednostiSet.
                Select(vv => new VlasnikVrednostiForSelect
                {
                    Id = vv.Id,
                    Pime = vv.Prezime + ' ' + vv.Ime
                }).
                OrderBy(vv => vv.Pime).
                ToListAsync();
        }
    }
}

