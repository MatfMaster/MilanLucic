using Zib.Models;
using Zib.Repositories;
using Zib.Data;
using System.Threading.Tasks;

namespace Zib
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IRanjivostiRepository Ranjivosti { get; }
        public IPretnjeRepository Pretnje { get; }
        public IVrstePretnjiRepository VrstePretnji { get; }
        public IVrsteVrednostiRepository VrsteVrednosti { get; }
        public IVrednostiRepository Vrednosti { get; }
        public IOrganizacioneCelineRepository OrganizacioneCeline { get; }
        public IVlasniciVrednostiRepository VlasniciVrednosti { get;  }
        public IPoslovneVrednostiRepository PoslovneVrednosti { get; }
        public IDobavljaciRepository Dobavljaci { get; }
        public IBiaRepository ProcesiServisiBia { get; }
        public IZaposleniRepository Zaposleni { get; }
        public IPretnjeRanjivostiRepository PretnjeRanjivosti { get;  }
        public IProcenaRizikaVrsteVrednostiRepository ProcenaRizikaVrsteVrednosti { get;  }
        public IVrstaMereRepository VrstaMere { get;  }
        public IMereRepository Mere { get;  }
        public IIntenzitetPretnjiRepository IntenzitetPretnji { get; }
        public IIntenzitetRanjivostiRepository IntenzitetRanjivosti { get; }

        public IVrsteVrednosti_PretnjeRanjivostiRepository VrsteVrednosti_PretnjeRanjivosti { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Ranjivosti = new RanjivostiRepository(_context);            
            Pretnje = new PretnjeRepository(_context);
            VrstePretnji = new VrstePretnjiRepository(_context);
            VrsteVrednosti = new VrsteVrednostiRepository(_context);
            Vrednosti = new VrednostiRepository(_context);
            OrganizacioneCeline = new OrganizacioneCelineRepository(_context);
            VlasniciVrednosti = new VlasniciVrednostiRepository(_context);
            PoslovneVrednosti = new PoslovneVrednostiRepository(_context);
            Dobavljaci = new DobavljaciRepository(_context);
            ProcesiServisiBia = new BiaRepository(_context);
            Zaposleni = new ZaposleniRepository(_context);
            PretnjeRanjivosti = new PretnjeRanjivostiRepository(_context);
            ProcenaRizikaVrsteVrednosti = new ProcenaRizikaVrsteVrednostiRepository(_context);
            VrstaMere = new VrstaMereRepository(_context);
            Mere = new MereRepository(_context);
            VrsteVrednosti_PretnjeRanjivosti = new VrsteVrednosti_PretnjeRanjivostiRepository(_context);
            IntenzitetPretnji = new IntenzitetPretnjiRepository(_context);
            IntenzitetRanjivosti = new IntenzitetRanjivostiRepository(_context);
        }


        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
