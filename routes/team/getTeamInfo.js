const cheerio = require('cheerio')

const getTeamInfo = async (fastify) => {
  fastify.get("/api/team", async (request, reply) => {
    let { page } = request.query
    if (!page) {
        page = 1
    }
    const url = `https://cricheroes.in/team-profile/3282808/METAVERSE`
    const req = await fetch(url)
    const res = await req.text()
    const $ = cheerio.load(res)
    const teamLogo = $('div.container > div > div > div.media-left.media-middle > a > img').attr('src')
    // console.log(teamLogo)
    let dataArr = []
    dataArr.push({
       teamLogo 
    })
    $('')
    return { result: dataArr };
  });
};

module.exports = getTeamInfo;
