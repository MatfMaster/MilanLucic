using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Persistance;
using Zib.Models;
using Zib.Data;
using Zib.ViewModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Zib.Repositories
{
    public class ZaposleniRepository: Repository<Zaposleni>, IZaposleniRepository
    {

        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public ZaposleniRepository(ApplicationDbContext context): base(context)
        {}

        public async Task<IEnumerable<ZaposleniViewModel>> ZaposleniZaSelect()
        {
            return await ApplicationDbContext.Zaposleni.OrderBy(z => z.Prezime).ThenBy(z => z.Ime).
                            Select(z => new ZaposleniViewModel { Id = z.Id, Pime = $"{z.Prezime} {z.Ime}"}).
                            ToListAsync();
        }
    }
}
