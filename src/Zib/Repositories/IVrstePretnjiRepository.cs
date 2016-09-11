using Common.Persistance;
using System.Collections.Generic;
using Zib.Models;

namespace Zib.Repositories
{
    public interface IVrstePretnjiRepository : IRepository<VrstaPretnje>
    {
        // Za ng2-select
        IEnumerable<Ng2Select> VrstePretnjiForNg2Select();
    }
}
