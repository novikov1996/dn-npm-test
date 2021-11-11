# rps-engine-client-js
[![npm version](https://badge.fury.io/js/rps-engine-client-js.svg)](https://badge.fury.io/js/rps-engine-client-js)

Regdata RPS Engine Client library (JS)

## RPS Engine Client library documentation

The full documentation is available in [RPS Community](https://community.rpsprod.ch/library)

## Installation

Use `npm` to install the RPS Engine Client library:

```sh
npm i rps-engine-client-js
```

## Usage

### Simple example

```js
const {
  EngineClient,
  RequestBuilder,
  TokenProvider,
  RPSContext,
  RPSValue,
  RPSEvidence
} = require('rps-engine-client-js/lib')

const IDENTITY_SERVER_HOST_NAME = 'https://identity.rpsprod.ch'
const ENGINE_HOST_NAME = 'https://engine.rpsprod.ch'

const CLIENT_ID = 'c6cbde13-542d-4849-a69e-3962ed09bc10'
const CLIENT_SECRET = '37571534bf6d40878fa77cb7b354b3274e6c047bd6404468b0fa2345cb7ebe61'

const secrets = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
}

const rightsContext = new RPSContext([
  new RPSEvidence({name: 'Role', value: 'Admin'})
])

const processingContext = new RPSContext([
  new RPSEvidence({name: 'Action', value: 'Protect'})
])

const tokenProvider = new TokenProvider({
  identityServerHostName: IDENTITY_SERVER_HOST_NAME,
  ...secrets
})

const engineClient = new EngineClient({
  config: {baseURL: ENGINE_HOST_NAME},
  tokenProvider
})

const instances = [
  new RPSValue({className: 'User', propertyName: 'FirstName', value: 'Jonny'}),
  new RPSValue({className: 'User', propertyName: 'LastName', value: 'Silverhand'}),
  new RPSValue({className: 'User', propertyName: 'BirthDate', value: '16.11.1988'})
]

const requestData = new RequestBuilder()
  .addRequest({instances, rightsContext, processingContext})
  .build()

const response = await engineClient.transform(requestData)
console.log(response)
```
