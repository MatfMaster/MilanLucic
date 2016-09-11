using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Persistance;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IZaposleniRepository : IRepository<Zaposleni>
    {
        Task<IEnumerable<ZaposleniViewModel>> ZaposleniZaSelect();
    }
}
