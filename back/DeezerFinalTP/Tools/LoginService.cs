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
        private List<Utilisateur> listeUsers = new List<Utilisateurs>();
        //{
        //    //new Utilisateur {Id = 1, FirstName = "Ihab", LastName="ABADI", Email="ihab@utopios.net", Password="123456"}
        //};

        public Utilisateur LogIn(string email, string password)
        {
            Utilisateur utilisateur = listeUsers.SingleOrDefault(x => x.Email == email && x.Password == password);
            if (utilisateur == null)
                return null;
            //Objet pour creer un json web Token
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            //Convertir la chaine de cryptage en bytes
            byte[] key = Encoding.ASCII.GetBytes("je suis une chaine secret");
            //Description du contenu du JWT
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor();
            descriptor.Subject = new ClaimsIdentity(new Claim[]
            {
                //Contenu du body du JWT
                new Claim(ClaimTypes.Email, utilisateur.Email),
                new Claim(ClaimTypes.NameIdentifier, utilisateur.Id.ToString()),
                new Claim(ClaimTypes.Name, utilisateur.Nickname),
            });
            //date d'expiration du JWT
            descriptor.Expires = DateTime.Now.AddDays(1);
            //Algo pour signier le JWT
            descriptor.SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            //Création du token
            SecurityToken token = tokenHandler.CreateToken(descriptor);
            //Convertir le token en chaine de caractère et le stocker dans le Token d'User
            utilisateur.Token = tokenHandler.WriteToken(token);
            return utilisateur;
        }
    }

    public interface ILoginService
    {
    }
}
