const express = require('express')
const {graphqlHTTP} = require('express-graphql')
// const = require('')
const schema = require('./schema')

const app = express()

//with graphql we only have one endpoint /graphQL 
//and then a schema 
app.use('/graphql', graphqlHTTP({
    schema, 
    //a useful tool to see everything 
    graphiql: true
}))

const PORT = process.env.port || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))