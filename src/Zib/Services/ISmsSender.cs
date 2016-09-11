using System.Threading.Tasks;

namespace Zib.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
