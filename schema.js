//where all the stuff with graphql will go 
//users, posts, all would be object types 
const axios = require('axios')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql')

//using 3rd party api

//launch type 
const LaunchType = new GraphQLObjectType({
    name: 'Launch', 
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString}, 
        launch_year: {type: GraphQLString}, 
        launch_date_local: {type: GraphQLString}, 
        launch_success: {type: GraphQLBoolean}, 
        //creating your own type, how you create realationships in your schema
        rocket: {type: RocketType}
})
})
//rockettype
const RocketType = new GraphQLObjectType({
    name: 'Rocket', 
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString}, 
        rocket_type: {type: GraphQLString}, 
})
})

//root query 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        launches: {
            //get a list of an array of launches
            type: new GraphQLList(LaunchType), 
            resolve(parent, args) {
                //return the data with the api's end point
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data)
                // .then(data => console.log(data))
            }
        }, 
        launch: {
            //since we're just getting a single launch we dont need the list
            type: LaunchType,
            //the argument to find the launch, like an id so flight number here
            args: {
                flight_number: {type: GraphQLInt}
            }, 
            resolve(parent, args) {
                //get request with args.flight_number(the id we're checking for)
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data)
            }
        }, 
        rockets: {
            //get a list of an array of rockets
            type: new GraphQLList(RocketType), 
            resolve(parent, args) {
                //return the data with the api's end point
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(res => res.data)
                // .then(data => console.log(data))
            }
        }, 
        rocket: {
            //since we're just getting a single rocket we dont need the list
            type: RocketType,
            //the argument to find the launch, like an id so flight number here
            args: {
                id: {type: GraphQLInt
                i}
            }, 
            resolve(parent, args) {
                //get request with args.id for the specific id we're looking for
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
    //if you want mutations to update for crud 
})
