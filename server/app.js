const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');


const app = express();

// allow cross-origin requests
app.use(cors())

// connect to mlab data base
// make sure to replace with your info
mongoose.connect('mongodb+srv://graphql-bookcase:test123123@cluster-graphql-tutoria.jsq8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once(('open'), () => {
    console.log('Connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// tell app to liste to specific port
app.listen(4000, () => console.log('Server is up and waiting...'))