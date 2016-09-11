using System.Collections.Generic;
using System.Threading.Tasks;
using Zib.Models;
using Zib.ViewModels;

namespace Zib.Repositories
{
    public interface IPretnjeRanjivostiRepository
    {
        Task<PretnjeRanjivosti> Get(int id);
        //Task<PretnjeRanjivostiViewModel> GetAll();
        Task<IList<PretnjeRanjivostiZaProcenuRizikaViewModel>> GetPretnjeRanjivostiZaProcenuRizika();
        Task<IList<PretnjaRanjivostZaVrstuVrednosti>> PretnjeRanjivostiZaVrstuVrednosti(int VrstaVrednostiId);
        Task PretnjeRanjivostiZaVrstuVrednostiPrimenjeneMere(int pretnjaRanjivostId);
        Task<IList<RanjivostiZaPretnjuViewModel>> RanjivostiZaPretnju(int id);
        Task<PretnjeRanjivosti> GetByPretnjaRanjivost(int pretnjaId, int RanjivostId);
        Task<List<PretnjeRanjivosti_DefaultMere>> GetDefaultMere(int id);
    }
}
