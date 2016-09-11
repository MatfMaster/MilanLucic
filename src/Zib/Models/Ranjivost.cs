using Common.Persistance;
using FluentValidation.Attributes;
using System.Collections.Generic;

namespace Zib.Models
{
    [Validator(typeof(RanjivostValidator))]
    public class Ranjivost: IEntity
    {
        public int Id { get; set; }
        public string Opis { get; set; }

        // Vise prema vise za pretnje
        public List<PretnjeRanjivosti> Pretnje { get; set; }

        public Ranjivost()
        {
            Pretnje = new List<PretnjeRanjivosti>();
        }
    }
}
