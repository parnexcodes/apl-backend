const cheerio = require('cheerio')

const getMatchDetailV2 = async (fastify) => {
  fastify.get("/api/match/v2/detail", async (request, reply) => {
    const { id } = request.query
    const url = `https://cricheroes.in/api/v1/scorecard/get-mini-scorecard/${id}`
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

module.exports = getMatchDetailV2;