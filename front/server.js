const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8')),
    tracks = JSON.parse(fs.readFileSync('data/tracks.json', 'utf-8')),
    port = 8084;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

//Mettre à jour les fichiers users.json
const writeFiles = () => {
    fs.writeFileSync('data/users.json', JSON.stringify(users));
    fs.writeFileSync('data/tracks.json', JSON.stringify(tracks));
}

app.use(express.static(__dirname + '/dist'));


//Retourner liste des tracks
app.get('/tracks', (req, res) => {
    res.json(tracks);
});

//retourner track by id
app.post('/track', (req, res) => {
    const data = req.body;
    const result = {};
    const t = tracks.find(x => x.id == data.id);
    if (t) {
        result.error = false;
        result.track = t;
    }
    else {
        result.error = true;
        result.message = "track n'existe pas";
    }
    res.json(result);
});

app.post('/addTrack', (req, res) => {
    const data = req.body;
    tracks.push({
        id: (tracks.length == 0) ? 1 : tracks[tracks.length - 1].id + 1,
        ...data
    })
    writeFiles();
    res.json({ error: false });
})
//Retourner liste des tracks by search
/*
    req => search
*/
app.post('/tracks', (req, res) => {
    let data = req.body;
    const searchTracks = tracks.filter(x => x.title.toLowerCase().includes(data.search) || x.artist.toLowerCase().includes(data.search));
    res.json(searchTracks);
})


//Se connecter
app.post('/auth/login', (req, res) => {
    const userLogin = req.body;
    let result = {};
    const u = users.find(x => x.email == userLogin.email && x.password == userLogin.password);
    if (u) {
        u.token = Math.random().toString(36).substr(2);
        result.error = false;
        result.id = u.id;
        result.token = u.token;
    }
    else {
        result.error = true;
    }
    writeFiles();
    res.json(result);
});

//sign In
app.post('/signIn', (req, res) => {
    const user = req.body;
    const result = {};
    if (user.email == '' || user.password == '' || user.nom == '' || user.prenom == '') {
        result.error = true;
    }
    else {
        result.error = false;
        users.push({
            id: (users.length == 0) ? 1 : users[users.length - 1].id + 1,
            ...user,
            likes: [],
            playlists: [],
        });
        writeFiles();
    }

    res.json(result);
})

//Add track to likes
//id, token, trackId
app.post('/like', (req, res) => {
    const result = {};
    const data = req.body;
    const u = users.find(x => x.id == data.id && x.token == data.token);
    if (u) {
        const likeExist = u.likes.find(x => x == data.trackId);
        if (likeExist) {
            u.likes.splice(u.likes.indexOf(likeExist), 1);
            result.message = "like supprimé";
        }
        else {
            u.likes.push(data.trackId);
            result.message = "like ajouté";
        }
        writeFiles();
        result.error = false;
    }
    else {
        result.error = true;
        result.message = "error utilisateur";
    }
    res.json(result);
})

//Add playList
//
app.post('/playList', (req, res) => {
    const result = {};
    const data = req.body;
    const u = users.find(x => x.id == data.id && x.token == data.token);
    if (u) {
        const playListExist = u.playlists.find(x => x.title == data.titlePlayList);
        if (playListExist) {
            result.message = "playlist exist";
        }
        else {
            u.playlists.push({
                id: (u.playlists.length == 0) ? 1 : u.playlists[u.playlists.length - 1].id + 1,
                title: data.titlePlayList, tracks: []
            });
            result.message = "playList ajouté";
        }
        writeFiles();
        result.error = false;
    }
    else {
        result.error = true;
        result.message = "error utilisateur";
    }
    res.json(result);
})
//Ajouter un track à une playList
//req id, token, playListId, trackId
app.post('/playList/add', (req, res) => {
    const result = {};
    const data = req.body;
    const u = users.find(x => x.id == data.id && x.token == data.token);
    if (u) {
        const playList = u.playlists.find(x => x.id == data.playListId);
        if (playList) {
            playList.tracks.push(data.trackId);
            result.message = "track ajouté";
            writeFiles();
        }
        else {
            result.message = "playList n'existe pas";
        }
        result.error = false;
    }
    else {
        result.error = true;
        result.message = "error utilisateur";
    }
    res.json(result);
})

//se deconnecter 
app.post('/auth/logout', (req, res) => {
    const infoLogin = req.body;
    let result = {};
    const u = users.find(x => x.id == infoLogin.id && x.token == infoLogin.token);
    result.error = (u) ? false : true;
    u.token = '';
    writeFiles();
    res.json(result)
});

//Tester si connecter

app.post('/auth/isLogged', (req, res) => {
    const infoLogin = req.body;
    let result = {};
    const u = users.find(x => x.id == infoLogin.id && x.token == infoLogin.token);
    result.error = (u) ? false : true;
    result.nom = u.nom;
    result.prenom = u.prenom;
    res.json(result)
})

app.post('/auth/getUser', (req, res)=> {
    const infoLogin = req.body;
    let result = {};
    const u = users.find(x => x.id == infoLogin.id && x.token == infoLogin.token);
    result.error = (u) ? false : true;
    result.user = {};
    for(let p in u) {
        if(p != "password") {
            result.user[p] = u[p];
        }
    }
    res.json(result);
})

app.listen(port);



