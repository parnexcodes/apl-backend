const cheerio = require('cheerio')

const getTeamPlayers = async (fastify) => {
  fastify.get("/api/team/players", async (request, reply) => {
    const { id } = request.query
    const url = `https://cricheroes.in/api/v1/team/get-my-team-players/${id}`
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

module.exports = getTeamPlayers;