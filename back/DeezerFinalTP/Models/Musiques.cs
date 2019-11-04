using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Models
{
    public class Musiques
    {
        private int id;
        private string title;
        private string artist;
        private string srcAudio;
        private string cover;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Artist { get => artist; set => artist = value; }
        public string SrcAudio { get => srcAudio; set => srcAudio = value; }
        public string Cover { get => cover; set => cover = value; }
    }
}
