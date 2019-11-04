﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeezerFinalTP.Models
{
    public class Utilisateur
    {
        private int id;
        private string mail;
        private string pseudo;
        private string avatar;
        private string pass;

        public int Id { get => id; set => id = value; }
        public string Mail { get => mail; set => mail = value; }
        public string Pseudo { get => pseudo; set => pseudo = value; }
        public string Avatar { get => avatar; set => avatar = value; }
        public string Pass { get => pass; set => pass = value; }
    }
}
