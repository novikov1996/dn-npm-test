const chalk = require('chalk')
const {RPSValue, RequestBuilder} = require('../../lib')
const {engineClient} = require('../settings')
const {printJsonValue} = require('../utils')

/**
 Gets RightsContexts from RightsContexts.json
 */
const RightsContexts = require('../data/RightsContexts.json')

/**
 Gets ProcessingContexts from ProcessingContexts.json
 */
const ProcessingContexts = require('../data/ProcessingContexts.json')

/**
 Gets originalJson from ExampleOfJsonToProtect.json
 */
const originalJson = require('../data/ExampleOfJsonToProtect.json')

/**
 Generates Instances from originalJson
 */
const instances = Object.entries(originalJson)
  .map(([propertyName, value]) => new RPSValue({
    className: 'User',
    propertyName,
    value
  }))

/**
 Builds requestData.
 */
const requestData = new RequestBuilder()
  .addRequest({
    instances,
    rightsContext: RightsContexts.Admin,
    processingContext: ProcessingContexts.Protect
  })
  .build()

/**
 REST API call to RPS Engine API.
 */
const engineTransform = async () => {
  console.log(chalk.green('--- Example of protection JSON file with related object ---'))

  const {data} = await engineClient.transform(requestData)

  const {instances} = data.responses[0]
  const transformedJson = instances.reduce((acc, {propertyName, transformed}) => ({
    ...acc, [propertyName]: transformed
  }), {})

  printJsonValue('Original JSON', originalJson)
  printJsonValue('Transformed JSON', transformedJson)

  console.log(chalk.green(`-------------------------------------------------------------------------------------\n`))
}

module.exports = engineTransform
