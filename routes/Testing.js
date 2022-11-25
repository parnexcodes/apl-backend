const cheerio = require('cheerio')

const Testing = async (fastify) => {
  fastify.get("/api/testing", async (request, reply) => {
    const { type } = request.query
    // const url = `https://cricheroes.in/tournament/508566/Arya-Premier-League-(APL)/past-matches/1/1669193436957#Leaderboard`
    // const req = await fetch(url)
    // const res = await req.text()
    const url = `https://cricheroes.in/api/v1/match/get-matches/3/-1/-1?tournamentid=508566`
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
    // console.log(res)
    // const $ = cheerio.load(res)
    // const dataArr = []
    // $('ul.list-group.pmd-z-depth.pmd-list.pmd-card-list').find('li').each((index, element) => {
    //     let playerName = $(element).find('div.media-body.player-pro-identity').find('h3').find('a').text()
    //     console.log(index)
    //     dataArr.push({
    //         playerName
    //     })
    // })
    return { result: res };
  });
};

module.exports = Testing;
