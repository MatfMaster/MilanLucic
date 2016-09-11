using Common.Persistance;
using System.Collections.Generic;
using System.Threading.Tasks;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IPretnjeRepository : IRepository<Pretnja>
    {
        Task<IEnumerable<PretnjaViewModel>> GetAllViewModel();

    }
}
