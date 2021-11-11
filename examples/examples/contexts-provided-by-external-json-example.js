const chalk = require('chalk')
const {RPSValue, RequestBuilder} = require('../../lib')
const {engineClient} = require('../settings')
const {printResponseValue} = require('../utils')

/**
 Gets RightsContexts from RightsContexts.json
 */
const RightsContexts = require('../data/RightsContexts.json')

/**
 Gets ProcessingContexts from ProcessingContexts.json
 */
const ProcessingContexts = require('../data/ProcessingContexts.json')

/**
 Manually creates values.
 */
const rawFirstName = new RPSValue({
  className: 'User',
  propertyName: 'FirstName',
  value: 'Jonny'
})
const rawLastName = new RPSValue({
  className: 'User',
  propertyName: 'LastName',
  value: 'Silverhand'
})
const rawBirthDate = new RPSValue({
  className: 'User',
  propertyName: 'BirthDate',
  value: '16.11.1988'
})

const protectedFirstName = new RPSValue({
  className: 'User',
  propertyName: 'FirstName',
  value: 'n99toNMwdjjGtWs3SxkrxQ=='
})
const protectedLastName = new RPSValue({
  className: 'User',
  propertyName: 'LastName',
  value: 'FLGqfDklPngzYAD8066q40drM1jZYQzKktF1YO81A=='
})
const protectedBirthDate = new RPSValue({
  className: 'User',
  propertyName: 'BirthDate',
  value: '02.09.1961'
})

/**
 Builds requestData.
 */
const requestData = new RequestBuilder()
  .addRequest({
    instances: [rawFirstName, rawLastName, rawBirthDate],
    rightsContext: RightsContexts.Admin,
    processingContext: ProcessingContexts.Protect
  })
  .addRequest({
    instances: [protectedFirstName, protectedLastName, protectedBirthDate],
    rightsContext: RightsContexts.Admin,
    processingContext: ProcessingContexts.Deprotect
  })
  .build()

/**
 REST API call to RPS Engine API.
 */
const engineTransform = async () => {
  console.log(chalk.green('--- Example with rights and processing contexts provided by external JSON files ---'))

  const {data} = await engineClient.transform(requestData)

  printResponseValue('Raw', data.responses[0])
  printResponseValue('Protected', data.responses[1])

  console.log(chalk.green(`-------------------------------------------------------------------------------------\n`))
}

module.exports = engineTransform
