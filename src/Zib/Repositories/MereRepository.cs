using System.Collections.Generic;
using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public class MereRepository: Repository<Mera>, IMereRepository
    {
        //private ApplicationDbContext _context;

        public ApplicationDbContext ApplicationContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public MereRepository(ApplicationDbContext context): base(context)
        {}

        public async Task<IEnumerable<StatusMere>> StatusMere()
        {
            return await ApplicationContext.Set<StatusMere>().OrderBy(sm => sm.Status).ToListAsync();
        }

        public async Task<IEnumerable<MeraZaProcenuRizikaViewModel>> GetAktivneMereZaProcenuRizika()
        {
            var ret = await ApplicationContext.
                Set<Mera>().
                Where(m => m.Aktivna == true).
                OrderBy(m => m.Oznaka).
                ThenBy(m => m.Naziv).
                Select( m => new MeraZaProcenuRizikaViewModel { Id = m.Id, Naziv = m.Naziv, Oznaka = m.Oznaka}).
                ToListAsync();

            return ret;
        }



    }
}
