const express = require('express');
var mongoose = require('mongoose');
var User = require('./models/User');
var Post = require('./models/Post');
var db = require('./config/dburl').myUrl;
var bodyparser = require("body-parser");

const app = express();
const port = 7000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
    .connect("mongodb://localhost:27017/socialnetwork")
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => console.log("Error connecting to db", err));

app.post('/users/signup', async (req, res) => {
    var userNew = new User({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
        state: req.body.state,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth
    });
    await User.findOne({ username: userNew.username })
        .then(async (profile) => {
            if (!profile) {
                await (userNew.save()).then(() => {
                    res.status(200).send(userNew)
                }).catch(err => { console.log(err) });
            }
            else {
                res.send("User already exists");
            }
        }).catch(err => {
            console.log(err);
            res.status(500);
        });
});

app.post('/users/login', (req, res) => {
    var newUser = {}
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    User.findOne({ username: newUser.username })
        .then((profile) => {
            if (!profile) {
                res.send("User does not exist");
            }
            else {
                console.log("User password is ", profile.password);
                console.log("Request password is ", newUser.password);
                if (profile.password == newUser.password) {
                    res.send("Login successful");
                }
                else {
                    res.send("Incorrect password");
                }
            }
        })
        .catch(err => {
            console.error("Error is ", err.message);
        });
});

app.post('/posts/', async (req, res) => {
    var postNew = new Post({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.body.createdBy,
        createdAt: new Date(),
    });

    await (postNew.save()).then(() => {
        res.status(200).send(postNew)
    }).catch(err => {
        console.log(err);
        res.status(500).send("Error while creating post" + err);
    });
});

app.get("/posts", async(req, res) => {
    let posts = await Post.find()
    
        .then((allposts) => {
            res.status(200).send(allposts);
        }).catch(err => {
            console.log(err);
            res.status(500).send("Error while getting posts" + err);
        });
});


app.listen(port, () => {
    console.log(`Listening on ${port}`);
})