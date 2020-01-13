// implement your API here
// import express from 'express'; // ES2015 module syntax

const express = require('express') // CommonJS modules

const Hubs = require('./data/db.js') // our Hubs database library


const server = express()


// middleware teaches express to do new things
server.use(express.json());   // needs to parse json

// routes or endpoints

// GET to "/"
server.get('/', (req, res) => {
    res.send({hello: 'Web 25!'})
});


const port = 8001
server.listen(port, () => {console.log(`\n ** api on port: ${port} **`)})