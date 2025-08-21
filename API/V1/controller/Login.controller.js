const User = require("../model/User.model");
const respond = require("../../../Helper/Object");

module.exports.GetAll = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await User.findOne({
      email: email,
      password: password,
      status: true,
    });

    if (!account) {
      respond.status = false;
      respond.error = 100;
      respond.data = [];
      return res.json(respond);
    } else {
      respond.status = true;
      respond.error = null;
      respond.data = account.token;
      return res.json(respond);
    }
  } catch (error) {
    respond.status = false;
    respond.error = 500;
    respond.data = null;
    return res.json(respond);
  }
};
