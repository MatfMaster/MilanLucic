using Common.Persistance;
using System.Threading.Tasks;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IBiaRepository : IRepository<ProcesServisBia>
    {
        Task<ProcesiServisiBiaViewModel> GetAllViewModel();
    }
}
