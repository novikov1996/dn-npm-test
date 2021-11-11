process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const simpleUsageExample = require('./examples/simple-usage-example')
const contextsProvidedByExternalJsonExample = require('./examples/contexts-provided-by-external-json-example')
const usageWithDependenciesExample = require('./examples/usage-with-dependencies-example')
const usageWithRelatedObjectExample = require('./examples/usage-with-related-object-example')

const asyncStartExamples = async () => {
  await simpleUsageExample()
  await contextsProvidedByExternalJsonExample()
  await usageWithDependenciesExample()
  await usageWithRelatedObjectExample()
}

asyncStartExamples()
  .catch(e => console.log(e))
