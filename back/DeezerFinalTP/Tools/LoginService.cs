using DeezerFinalTP.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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

        private List<Utilisateur> listeUsers = new List<Utilisateur>();
        
        public Utilisateur LogIn(string email, string password)
        {
            Utilisateur user = listeUsers.SingleOrDefault(x => x.Mail == email && x.Pass == password);
            if (user == null)
                return null;

            //Objet pour creer un json web Token
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            //Convertir la chaine de cryptage en bytes
            byte[] key = Encoding.ASCII.GetBytes(secret);
            //Description du contenu du JWT
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor();
            descriptor.Subject = new ClaimsIdentity(new Claim[]
            {
                //Contenu du body du JWT
                new Claim(ClaimTypes.Email, user.Mail),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Pseudo)
            });

            //date d'expiration du JWT
            descriptor.Expires = DateTime.Now.AddHours(1);
            //Algo pour signier le JWT
            descriptor.SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            //Création du token
            SecurityToken token = tokenHandler.CreateToken(descriptor);
            //Convertir le token en chaine de caractère et le stocker dans le Token d'User
            user.Token = tokenHandler.WriteToken(token);
            return user;
        }

        public interface ILoginService
        {
            Utilisateur LogIn(string email, string password);
        }
    }
}


