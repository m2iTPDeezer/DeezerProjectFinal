using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DeezerFinalTP.Models;
using DeezerFinalTP.Tools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeezerFinalTP.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        DataDbContext data;

        public UtilisateurController(DataDbContext _data)
        {
            data = _data;
        }

        [HttpGet]
        public ActionResult Get()
        {
            //var tes = data.Utilisateurs.ToSql();
            return Ok(data.Utilisateurs.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            return Ok(data.Utilisateurs.Find(id));
        }

        [HttpPost]
        public ActionResult Post()
        {
            var dataForm = Request.Form;
            Utilisateur c = new Utilisateur();

            c.Mail = dataForm["Nom"].ToString();
            c.Pseudo = dataForm["Prenom"].ToString();
            c.Pass = dataForm["Email"].ToString();
            c.Role = dataForm["Password"].ToString();

            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                //chemin de route du fuchier
                //var pathFolder = Path.Combine("wwwroot", "avatar", Path.GetFileName(file.FileName));
                var pathFolder = Path.Combine("wwwroot", "avatar", Path.GetFileName(file.FileName));

                FileStream s = new FileStream(pathFolder, FileMode.Create);
                c.Avatar = "http://" + Request.Host + "/avatar/" + Path.GetFileName(file.FileName);
                //copie du fichier
                file.CopyTo(s);
                s.Close();

                data.Utilisateurs.Add(c);
                if (data.SaveChanges() >= 1)
                {
                    return Ok(new { message = "user ajouté", error = false, userId = c.Id });
                }
                else
                {
                    return Ok(new { message = "erreur serveur", error = true });
                }
            }
            else
            {
                return Ok(new { message = "erreur upload", error = true });
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Utilisateur c)
        {
            Utilisateur user = data.Utilisateurs.Find(id);
            if (user != null)
            {
                user.Mail = (c.Mail != null) ? c.Mail : user.Mail;
                user.Pseudo = (c.Pseudo != null) ? c.Pseudo : user.Pseudo;
                user.Pass = (c.Pass != null) ? c.Pass : user.Pass;
                user.Role = (c.Role != null) ? c.Role : user.Role;
                if (data.SaveChanges() >= 1)
                {
                    return Ok(new { message = "user modifié", error = false, userId = c.Id });
                }
                else
                {
                    return Ok(new { message = "erreur serveur", error = true });
                }
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Utilisateur user = data.Utilisateurs.Find(id);
            if (user != null)
            {
                data.Utilisateurs.Remove(user);
                if (data.SaveChanges() >= 1)
                {
                    return Ok(new { message = "user supprimé", error = false });
                }
                else
                {
                    return Ok(new { message = "erreur serveur", error = true });
                }
            }
            else
            {
                return NotFound();
            }
        }

    }
}