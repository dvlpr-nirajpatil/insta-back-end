const response = require("../core/response");

const bodyRequired = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return response(res, 400, "Json Payload is required");
  }
  next();
};

module.exports = bodyRequired;
