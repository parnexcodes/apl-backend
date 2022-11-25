const cheerio = require('cheerio')
const { DateTime } = require("luxon");

const getUpcomingMatches = async (fastify) => {
  fastify.get("/api/upcoming-matches", async (request, reply) => {
    let { page } = request.query
    if (!page) {
        page = 1
    }
    const url = `https://cricheroes.in/tournament/508566/Arya-Premier-League-(APL)/upcoming-matches/${page}/1669225851375`
    const req = await fetch(url)
    const res = await req.text()
    const $ = cheerio.load(res)
    let dataArr = []
    $('div.row.upmatchesDiv').find('div.col-lg-4.col-md-6.col-sm-6.col-xs-12.custom-card-matches').each((index, element) => {
        let matchLink = $(element).find('a').attr('href')
        let teamA = $(element).find('div.section1').find('h3.team-name').text()
        let teamB = $(element).find('div.section2').find('h3.team-name').text()
        let matchType = $(element).find('div.pmd-card-media > div.media-body > h3 > strong').text()
        let matchTime = $(element).find('div.pmd-card-actions.test-result > span').attr('data-date').replace('+0000 (Coordinated Universal Time)', '').trim()
        let dt = new Date(matchTime)
        let newTime = dt.toLocaleString(DateTime.DATETIME_MED)
        // matchTime = DateTime.fromHTTP(matchTime).toFormat('ff')
        dataArr.push({
            matchLink,
            matchType,
            teamA,
            teamB,
            newTime
        })
    })
    return { result: dataArr };
  });
};

module.exports = getUpcomingMatches;
