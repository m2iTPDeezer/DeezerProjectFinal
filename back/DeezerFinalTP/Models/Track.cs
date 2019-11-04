using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Models
{
    public class Track
    {
        private int id;
        private string title;
        private string artist;
        private string urlMusic;
        private string urlCover;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Artist { get => artist; set => artist = value; }
        public string UrlMusic { get => urlMusic; set => urlMusic = value; }
        public string UrlCover { get => urlCover; set => urlCover = value; }
    }
}
