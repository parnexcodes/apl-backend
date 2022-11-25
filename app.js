// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true, ignoreTrailingSlash: true })
const fastifyEnv = require('@fastify/env')

const schema = {
  type: 'object',
  required: ['API_KEY', 'DEVICE_TYPE', 'UUID', 'TOURNAMENT_ID'],
  properties: {
    API_KEY: {
      type: 'string'
    },
    DEVICE_TYPE: {
      type: 'string'
    },
    UUID: {
      type: 'string'
    },
    TOURNAMENT_ID: {
      type: 'string'
    },
  },    
}

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env
}

// Declare a route
fastify.get('/api', async (request, reply) => {
  console.log(process.env)
  return {
    info: "Welcome to Arya Premier League API.",
    endpoints: [
      {
        pre: "/api/pre",
        cat: "/api/cat?q={category_name}",
        group: "/api/group?q={group_name}",
        search: "/api/search?q={search_query}"
      },
    ],    
  }
})

fastify.get("/*", async (request, reply) => {
  return { error: "Undefined Endpoint" };
});

// Tournament Endpoints
const getTournamentDetail = require('./routes/tournament/getTournamentDetail')
const getTournamentStandings = require('./routes/tournament/getTournamentStandings')

// Match Endpoints
const getMatchDetail = require('./routes/match/getMatchDetail')
const getMatchMVP = require('./routes/match/getMatchMVP')
const getMatchTopMVP = require('./routes/match/getMatchTopMVP')
const getPlayingSquad = require('./routes/match/getPlayingSquad')
const getMatchDetailV2 = require('./routes/match/getMatchDetailV2')
const getUpcomingMatches = require('./routes/match/getUpcomingMatches')
const getLiveMatches = require('./routes/match/getLiveMatches')

const Testing = require('./routes/Testing')

// Tournament Endpoints
fastify.register(getTournamentDetail)
fastify.register(getTournamentStandings)

// Match Endpoints
fastify.register(getMatchDetail)
fastify.register(getMatchMVP)
fastify.register(getMatchTopMVP)
fastify.register(getPlayingSquad)
fastify.register(getMatchDetailV2)
fastify.register(getUpcomingMatches)
fastify.register(getLiveMatches)

fastify.register(Testing)
fastify.register(fastifyEnv, options)

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()