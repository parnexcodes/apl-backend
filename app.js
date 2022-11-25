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
    endpoints: 
      {
        match: [
          {
            live: '/api/live-matches',
            upcoming: '/api/upcoming-matches',
            match_detail: '/api/match/detail?id=',
            match_detail_v2: '/api/match/v2/detail?id=',
            match_mvp: '/api/match/mvp?id=',
            top_mvp: '/api/match/top-mvp?id=',
            players: '/api/match/players?id='
          }
        ],
        tournament: [
          {
            tournament_detail: '/api/tournament/detail',
            tournament_standings: '/api/tournament/standings'
          }
        ]
      },    
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