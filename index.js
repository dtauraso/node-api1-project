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
            // console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: "The users information could not be retrieved."})
        })
}) // api is the location of all hub operations
// findById(id)
server.get('/api/users/:id', (req, res) => {
    console.log(req)
    // the id in the axios call
    Users.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
            } else {

                res.status(200).json(user)

            }
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: "The user information could not be retrieved."})
        })
})
// insert(user)

// create a Hub
server.post('/api/users', (req, res) => {
    const userData = req.body

    const keys = Object.keys(userData)
    if(!keys.includes("name") || !keys.includes("bio")) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})

    }
    // never trust the client, validate the data.  for now we trust the client for the demo
    Users.insert(userData)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
        })
})
// update(id, user)
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const updatedUser = req.body

    const keys = Object.keys(updatedUser)
    if(!keys.includes("name") || !keys.includes("bio")) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})

    }

    Users.update(id, updatedUser)
        .then(user => {
            if(!user) {
                res.status(404).json({errorMessage: "The user with the specified ID does not exist."})

            } else {
                res.status(200).json(user)

            }

        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: 'couldn\'t update the user'})
        })

})
// remove(id)
// delete a Hub
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    Users.remove(id)
        .then(result => {
            if(!result) {
                res.status(404).json({errorMessage: "The user with the specified ID does not exist."})

            }
            else {
                // only sent a 1 back
                res.status(200).json(result)

            }
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ errorMessage: "The user could not be removed"})
        })
})
// update a Hub

const port = 8001
server.listen(port, () => {console.log(`\n ** api on port: ${port} **`)})