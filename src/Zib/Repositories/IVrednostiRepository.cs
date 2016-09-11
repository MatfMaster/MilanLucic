using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Persistance;
using Zib.Models;

namespace Zib.Repositories
{
    public interface IVrednostiRepository : IRepository<Vrednost>
    {
        Task<IList<Vrednost>>  VrednostiZaVrstuVrednosti(int vrstaVrednostiId);
    }
}
