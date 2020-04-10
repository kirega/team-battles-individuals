const { User } = require('../../models/index');
// var {user} = require('../db/db');

const superagent = require('superagent');

exports.allUsers = (req, res, next) => {
  User.findAll({
    // include: [ { model: team } ],
    order: [ [ 'her', 'DESC' ] ]
  })
    .then(
      (user) => {
        return res.json(user);
      }
    )
    .catch(next);
};

exports.createUser = async (req, res, next) => {
  var { firstName, lastName, userName, teamId, phoneNumber} = req.body;
  //Confirm that the userName actually exists and set the her
  var url = `https://lichess.org/@/${userName}/perf/blitz`;
  let userData;
  try {
    let res = await superagent
      .get(url)
      .set('accept', 'application/vnd.lichess.v2+json');
    userData = JSON.parse(res.text);
  } catch (e) {
    console.log("error occured", e);
    res.status(400).json({ error: "UserName does not exist on Lichess" })
  }
 
  const her = userData.stat.highest ?  userData.stat.highest.int : 1500;
  try {
    var result = await User.create({
      firstName,
      lastName,
      userName,
      her,
      phoneNumber
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Unable to create user at this time, username may already be registered" })
  }

};

exports.deleteUser = async (req, res, next) => {
  var userId = req.params.id;
  try {
    var response = await User.destroy({ where: { id: userId } });
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.updatePayment = async(req, res, next) => {
  var userId = req.params.id;
  console.log(req.params);
  try {
    var userInstance = await User.findOne({ where: { id: userId } });
    console.log(userInstance);
    userInstance.update({paymentStatus: !userInstance.paymentStatus});
    res.status(200).json({ success: "success" });
  } catch (e) {
    res.status(400).json(e);
  }
};
