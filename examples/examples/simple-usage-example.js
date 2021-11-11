const chalk = require('chalk')
const {
  RPSValue,
  RPSContext,
  RPSEvidence,
  RequestBuilder
} = require('../../lib')
const {engineClient} = require('../settings')
const {printResponseValue} = require('../utils')

/**
 Manually creates admin rights context.
 */
const adminRightsContext = new RPSContext([
  new RPSEvidence({name: 'Role', value: 'Admin'})
])

/**
 Manually creates protecting processing context.
 */
const protectProcessingContext = new RPSContext([
  new RPSEvidence({name: 'Action', value: 'Protect'})
])

/**
 Manually creates protecting processing context with co.
 */
const deprotectProcessingContext = {evidences: {'Action': 'Deprotect'}}

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
    rightsContext: adminRightsContext,
    processingContext: protectProcessingContext
  })
  .addRequest({
    instances: [protectedFirstName, protectedLastName, protectedBirthDate],
    rightsContext: adminRightsContext,
    processingContext: deprotectProcessingContext
  })
  .build()

/**
 REST API call to RPS Engine API.
 */
const engineTransform = async () => {
  console.log(chalk.green('--- Example of simple protection and deprotection ---'))

  const {data} = await engineClient.transform(requestData)

  printResponseValue('Raw', data.responses[0])
  printResponseValue('Protected', data.responses[1])

  console.log(chalk.green(`-------------------------------------------------------------------------------------\n`))
}

module.exports = engineTransform
