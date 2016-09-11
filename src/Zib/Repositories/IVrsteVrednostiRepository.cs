using System.Collections.Generic;
using Common.Persistance;
using System.Threading.Tasks;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IVrsteVrednostiRepository : IRepository<VrstaVrednosti>
    {
        Task<VrsteVrednostiViewModel> GetAllViewModel();
        Task<VrstaVrednostiPosleAzuriranja> VrstaVrednostiPosleAzuriranja(int id);
        Task<int> Nivo(int nodeId);

        IList<VrstaVrednostiTree> VrsteVrednostiHijerarhija();
        IList<VrstaVrednostiForSelect> GetVrsteVrednostiForSelect();
    }
}
