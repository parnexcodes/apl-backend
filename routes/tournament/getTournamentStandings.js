const cheerio = require('cheerio')

const getTournamentStandings = async (fastify) => {
  fastify.get("/api/tournament/standings", async (request, reply) => {
    // const { type } = request.query
    const tournamentID = process.env.TOURNAMENT_ID
    const url = `https://cricheroes.in/api/v1/tournament/get-tournament-standing/${tournamentID}`
    const apiKey = process.env.API_KEY
    const deviceID = process.env.DEVICE_TYPE
    const uuid = process.env.UUID
    const req = await fetch(url, {
      headers: {
        "api-key": apiKey,
        "device-type": deviceID,
        "UDID": uuid
      }
    })
    const res = await req.json()
    return { result: res };
  });
};

module.exports = getTournamentStandings;
