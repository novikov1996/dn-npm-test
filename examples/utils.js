const chalk = require('chalk')

/**
 * Displays instances
 * console.log(`${unit} — ${originalLog} ${transformedLog}`)
 *
 * @param {string} prefix
 * @param {object[]} instances
 */
const printResponseValue = (prefix = '', {instances}) => {
  instances.forEach(({propertyName, original, transformed}) => {
    const unit = `${chalk.magenta(`${prefix} ${propertyName}`)}`
    const originalLog = `${chalk.cyan(`Original`)}: ${chalk.yellow(original)}.`
    const transformedLog = `${chalk.cyan(`Transformed`)}: ${chalk.yellow(transformed)}.`

    console.log(`${unit} — ${originalLog} ${transformedLog}`)
  })
}

/**
 * Displays JSON
 *
 * @param {string} title
 * @param {object} obj
 */
const printJsonValue = (title = '', obj = {}) => {
  console.log(`${chalk.magenta(title)}: 
${chalk.yellow(JSON.stringify(obj, null, '\t'))}`)
}

module.exports = {
  printResponseValue,
  printJsonValue
}
