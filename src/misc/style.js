const chalk = require("chalk");

//initializing
const error = chalk.red;
const warning = chalk.keyword('orange');
const success = chalk.green;
const info = chalk.blue;
const ghost = chalk.grey;

module.exports = {
    error,
    warning,
    success, info ,ghost
};