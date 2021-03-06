﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeezerFinalTP.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        [Route("/upload")]

        public ActionResult Upload()
        {
            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                var pathFolder = Path.Combine("images", Path.GetFileName(file.FileName));
                FileStream s = new FileStream(pathFolder, FileMode.Create);
                file.CopyTo(s);
                s.Close();
                return Ok(new { message = pathFolder });
            }
            else
            {
                return Ok(new { message = "upload error" });
            }

        }
    }
}