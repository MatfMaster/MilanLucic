using System.Collections.Generic;
using System.Threading.Tasks;
using Common.Persistance;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IMereRepository : IRepository<Mera>
    {
        Task<IEnumerable<StatusMere>> StatusMere();
        Task<IEnumerable<MeraZaProcenuRizikaViewModel>> GetAktivneMereZaProcenuRizika();
    }
}
