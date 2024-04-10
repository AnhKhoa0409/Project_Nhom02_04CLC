'use strict';

/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Logger = require('~/utils/discord');
const { env } = require('~/configs/environment');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    code: statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
    metadata: err.metadata,
  };

  if (env !== 'dev') delete responseError.stack;
  Logger.sendFormatLog({
    url: `URL: ${req.get('host')}${req.originalUrl}`,
    ip: `${req.ip}`,
    title: `Method: ${req.method}`,
    query: req.query,
    body: req.body,
    status: statusCode,
    message: responseError.message,
  });

  res.status(responseError.code).json(responseError);
};

module.exports = errorHandler;
