using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Tools
{
    public class LoginService : ILoginService
    {
        DataDbContext data;
        private string secret = "agent secret";

        public LoginService(DataDbContext _data)
        {
            data = _data;
        }
        public string LogIn(string email, string password)
        {
             
            throw new NotImplementedException();
        }
    }

}


