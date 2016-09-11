using Common.Persistance;
using Zib.Models;
using Zib.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Zib.Repositories
{
    public class VrsteVrednosti_PretnjeRanjivostiRepository : Repository<VrsteVrednosti_PretnjeRanjivosti>, IVrsteVrednosti_PretnjeRanjivostiRepository
    {
        private DbSet<VrsteVrednosti_PretnjeRanjivosti> vrsteVrednosti_PretnjeRanjivostiRepositorySet;

        //public IdentityDbContext Context { get; private set; }

        public ApplicationDbContext ApplicationDbContext
        {
            get { return Context as ApplicationDbContext; }
        }

        public VrsteVrednosti_PretnjeRanjivostiRepository(ApplicationDbContext context) : base(context)
        {
            //Context = context;
            vrsteVrednosti_PretnjeRanjivostiRepositorySet = Context.Set<VrsteVrednosti_PretnjeRanjivosti>();
        }

        public override async Task<VrsteVrednosti_PretnjeRanjivosti> Get(int id)
        {
            return await vrsteVrednosti_PretnjeRanjivostiRepositorySet.
                Include(x => x.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere).
                Include(x => x.PretnjaPre).
                Include(x => x.PretnjaPosle).
                Include(x => x.RanjivostPre).
                Include(x => x.RanjivostPosle).
                SingleOrDefaultAsync(x => x.Id == id);
        }

        //public override async Task<VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere> GetPrimenjeneMere(int id)
        //{
        //    return await vrsteVrednosti_PretnjeRanjivostiRepositorySet.
        //        Include(x => x.VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere).
        //        Select(x => new VrsteVrednosti_PretnjeRanjivosti_PrimenjeneMere { Id = x.Id, VrstaVrednosti_PretnjaRanjivostId = x.VrstaVrednostiId, MeraId = x.})
        //        SingleOrDefaultAsync(x => x.Id == id);
        //}
    }
}

