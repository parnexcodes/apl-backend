const cheerio = require('cheerio')

const getTournamentDetail = async (fastify) => {
  fastify.get("/api/tournament/detail", async (request, reply) => {
    // const { type } = request.query
    const tournamentID = process.env.TOURNAMENT_ID
    const url = `https://cricheroes.in/api/v1/tournament/get-tournament-detail/${tournamentID}`
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

module.exports = getTournamentDetail;
