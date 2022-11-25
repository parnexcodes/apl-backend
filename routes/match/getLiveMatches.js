const cheerio = require('cheerio')

const getLiveMatches = async (fastify) => {
  fastify.get("/api/live-matches", async (request, reply) => {
    let { page } = request.query
    if (!page) {
        page = 1
    }
    const url = `https://cricheroes.in/tournament/508566/Arya-Premier-League-(APL)/live-matches/${page}/1669308319271`
    const req = await fetch(url)
    const res = await req.text()
    const $ = cheerio.load(res)
    let dataArr = []
    $('div.row.matchesDiv').find('div.col-lg-4.col-md-6.col-sm-6.col-xs-12.custom-card-matches').each((index, element) => {
        let matchLink = $(element).find('a').attr('href')
        let teamA = $(element).find('div.section1').find('h3.team-name').text()
        let teamB = $(element).find('div.section2').find('h3.team-name').text()
        let matchType = $(element).find('div.pmd-card-media > div.media-body > h3 > strong').text()
        let tossResult = $(element).find('div.pmd-card-actions.test-result > span').text()
        let scoreA = $(element).find('div.section1 > div > div.media-right.test-score.col-lg-6.col-md-6.col-sm-6.col-xs-6 > span > b').text()
        let scoreB = $(element).find('div.section2 > div > div.media-right.test-score.col-lg-6.col-md-6.col-sm-6.col-xs-6 > span > b > span').text()
        dataArr.push({
            matchLink,
            matchType,
            teamA,
            teamB,
            tossResult,
            scoreA,
            scoreB
        })
    })
    return { result: dataArr };
  });
};

module.exports = getLiveMatches;
