using Common.Persistance;
using Zib.Models;
using Zib.Data;
using System.Collections.Generic;
using System.Linq;

namespace Zib.Repositories
{
    public class VrstePretnjiRepository: Repository<VrstaPretnje>, IVrstePretnjiRepository
    {

        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public VrstePretnjiRepository(ApplicationDbContext context): base(context)
        {}

        // Za ng2-select
        public IEnumerable<Ng2Select> VrstePretnjiForNg2Select()
        {
            return Context.Set<VrstaPretnje>()
                .OrderBy(x => x.Opis)
                .Select(x => new Ng2Select { Id = x.Id, Text = x.Opis })
                .ToList();
        }
    }
}
