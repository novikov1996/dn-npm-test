const {
  TokenProvider,
  EngineClient
} = require('../lib')

const RPSEngine = {
  ENGINE_HOST_NAME: 'https://engine.rpsdev.net',
  IDENTITY_SERVER_HOST_NAME: 'https://identity.rpsdev.net',
  API_KEY: 'ee91981e-22f0-476c-a7d0-adddfcea462b',
  SECRET_KEY: '2df4b1ad5dbb4ac99b8a0692a4e5a2ed4987e07d1c124f71afa29516e470508b'
}

/**
 Creates an instance of the class TokenProvider
 */
const tokenProvider = new TokenProvider({
  identityServerHostName: RPSEngine.IDENTITY_SERVER_HOST_NAME,
  clientId: RPSEngine.API_KEY,
  clientSecret: RPSEngine.SECRET_KEY
})

/**
 Creates an instance of the class EngineClient
 */
const engineClient = new EngineClient({
  config: {baseURL: RPSEngine.ENGINE_HOST_NAME},
  tokenProvider
})

module.exports = {
  RPSEngine,
  tokenProvider,
  engineClient
}
