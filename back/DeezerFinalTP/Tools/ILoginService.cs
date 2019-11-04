using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Tools
{
    public interface ILoginService
    {
        string LogIn(string email, string password);
    }
}
