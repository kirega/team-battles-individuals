var { user } = require('../db/db.js');
var  superagent = require('superagent');
const options = {
    method: 'get',
    url: "https://lichess.org/@/kirega/perf/blitz",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.lichess.v2+json"
    }
};

async function getUserData(userName) {
    var url = `https://lichess.org/@/${userName}/perf/blitz`;
    var userData;
    try {
        var res = await superagent
        .get(url)
        .set('accept','application/vnd.lichess.v2+json');
        userData = JSON.parse(res.text);
        return userData;
    } catch(e) {
        console.log("error occured");
    }
}

exports.updateUsers = async () => {
    // Updates the users scores;
    var results = await user.findAll({
        attributes: ['userName', 'id']
    });
 
    results.filter(async (k) => {
        // fetch the users 
        var userDetail = await user.findOne({
            where: { id: k.id }
        });
        setTimeout(async () => {
            var userStat = await getUserData(k.userName);
            var highest = userStat.stat.highest.int;
            userDetail.update({ her: highest });
        }, 2000);
    });
}