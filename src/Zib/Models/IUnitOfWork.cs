using System.Threading.Tasks;
using Zib.Repositories;

namespace Zib.Models
{
    public interface IUnitOfWork
    {
        IRanjivostiRepository Ranjivosti { get; }
        IPretnjeRepository Pretnje { get; }
        IVrstePretnjiRepository VrstePretnji { get; }
        IVrsteVrednostiRepository VrsteVrednosti { get; }
        IVrednostiRepository Vrednosti { get; }
        IOrganizacioneCelineRepository OrganizacioneCeline { get; }
        IVlasniciVrednostiRepository VlasniciVrednosti { get; }
        IPoslovneVrednostiRepository PoslovneVrednosti { get; }
        IDobavljaciRepository Dobavljaci { get; }
        IBiaRepository ProcesiServisiBia { get; }
        IZaposleniRepository Zaposleni { get; }
        IPretnjeRanjivostiRepository PretnjeRanjivosti { get; }
        IProcenaRizikaVrsteVrednostiRepository ProcenaRizikaVrsteVrednosti { get; }
        IVrstaMereRepository VrstaMere { get; }
        IMereRepository Mere { get; }
        IVrsteVrednosti_PretnjeRanjivostiRepository VrsteVrednosti_PretnjeRanjivosti { get; }
        IIntenzitetPretnjiRepository IntenzitetPretnji { get; }
        IIntenzitetRanjivostiRepository IntenzitetRanjivosti { get; }
        Task<int> Complete();
    }
}
