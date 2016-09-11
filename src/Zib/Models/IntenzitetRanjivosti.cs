using Common.Persistance;
using System.Collections.Generic;
using FluentValidation.Attributes;

namespace Zib.Models
{
    [Validator(typeof(IntenzitetRanjivostiValidator))]
    public class IntenzitetRanjivosti : IEntity
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public int Vrednost { get; set; }

        public virtual IList<VrsteVrednosti_PretnjeRanjivosti> VrsteVrednosti_PretnjeRanjivosti_Pre { get; set; }
        public virtual IList<VrsteVrednosti_PretnjeRanjivosti> VrsteVrednosti_PretnjeRanjivosti_Posle { get; set; }

    }
}
