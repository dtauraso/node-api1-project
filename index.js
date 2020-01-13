// implement your API here
// import express from 'express'; // ES2015 module syntax

const express = require('express') // CommonJS modules

const Users = require('./data/db.js') // our Hubs database library


const server = express()


// middleware teaches express to do new things
server.use(express.json());   // needs to parse json

// routes or endpoints

// GET to "/"
server.get('/', (req, res) => {
    res.send({hello: 'Web 25!'})
});

// see a list of Hubs
server.get('/api/users', (req, res) => {
    // read the data from the database (Hubs)

    Users.find() // return a promise
        .then(users => {
            // always return a status
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: 'couldn\'t get the list of users'})
        })
}) // api is the location of all hub operations
// findById(id)
server.get('/api/users/:id', (req, res) => {
    console.log(req)
    // the id in the axios call
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: 'couldn\'t get the user'})
        })
})
// insert(user)
// update(id, user

// create a Hub
server.post('/api/users', (req, res) => {
    const userData = req.body


    // never trust the client, validate the data.  for now we trust the client for the demo
    Users.insert(userData)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: 'couldn\'t create the user'})
        })
})
// delete a Hub
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    Users.remove(id)
        .then(result => {
            // not sending data back
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: 'couldn\'t delete the user'})
        })
})
// update a Hub

const port = 8001
server.listen(port, () => {console.log(`\n ** api on port: ${port} **`)})