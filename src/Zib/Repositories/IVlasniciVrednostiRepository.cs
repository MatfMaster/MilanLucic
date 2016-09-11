using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Persistance;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IVlasniciVrednostiRepository : IRepository<VlasnikVrednosti>
    {
        Task<IList<VlasnikVrednostiForSelect>> VlasniciVrednostiZaSelect();
    }
}
