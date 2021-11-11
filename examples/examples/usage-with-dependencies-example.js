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
 Manually creates values with ability to specify "dependencies".
 */
const paymentDate = new RPSValue({
  className: 'Payment',
  propertyName: 'Date',
  value: '02.11.2021',
  dependencies: {
    min: '01.10.2021',
    max: '02.11.2021'
  }
})
const paymentAmount = new RPSValue({
  className: 'Payment',
  propertyName: 'Amount',
  value: '999'
})

/**
 Builds requestData.
 */
const requestData = new RequestBuilder()
  .addRequest({
    instances: [paymentDate, paymentAmount],
    rightsContext: RightsContexts.Admin,
    processingContext: ProcessingContexts.Protect
  })
  .build()

/**
 REST API call to RPS Engine API.
 */
const engineTransform = async () => {
  console.log(chalk.green('--- Example of protection with dependencies ---'))

  const {data} = await engineClient.transform(requestData)

  printResponseValue('Payment', data.responses[0])

  console.log(chalk.green(`-------------------------------------------------------------------------------------\n`))
}

module.exports = engineTransform
