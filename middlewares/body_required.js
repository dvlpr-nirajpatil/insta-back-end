const response = require("../core/response");

const bodyRequired = (req, res, next) => {
  if (!req.is('application/json')) {
    return response(res, 400, "Content-Type must be application/json");
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return response(res, 400, "JSON payload is required");
  }

  next();
};

module.exports = bodyRequired;
