const morgan = require("morgan");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// MORGAN
morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});
const morganLogger = () => {
  if (process.env.NODE_ENV === "test") {
    return (req, res, next) => next();
  }
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :data"
  );
};

// UNKNOWN ENDPOINT
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

// TOKEN EXTRACTOR
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  authorization && authorization.toLowerCase().startsWith("bearer ")
    ? (request.token = authorization.substring(7))
    : (request.token = null);

  next();
};

// USER EXTRACTOR
const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");

  const decodedToken = jwt.verify(
    authorization.substring(7),
    process.env.SECRET
  );
  const user = await User.findById(decodedToken.id);

  authorization && authorization.toLowerCase().startsWith("bearer ")
    ? (request.user = user)
    : (request.user = null);

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganLogger,
  tokenExtractor,
  userExtractor,
};
