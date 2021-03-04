import chalk from 'chalk';

/**
 * The pad end length for each log message
 */
const padEndLength = parseInt(process.env.PAD_END_MESSAGE, 10);

// return the message with defined length
const padEndMessage = message => message.padEnd(padEndLength, '.');

// Logging information
export const info = (message = '', color = 'white') => padEndMessage(`${chalk.cyan('[Info]')} ${chalk[color](message)}`);

// Show success status in green
export const success = (message = '', color = 'greenBright') => padEndMessage(`${chalk.green('[Success]')} ${chalk[color](message)}`);

// Show the error warning in red
export const fail = (message = '', color = 'white') => padEndMessage(`${chalk.red('[Error]')} ${chalk[color](message)}`);
