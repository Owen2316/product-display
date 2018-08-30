const ENV = process.env.NODE_ENV || 'dev';
process.env.REACT_WEBPACK_ENV = ENV;
module.exports = require(`./webpack/${ENV}`);
