import HttpClientCreator from './HttpClientCreator'
import Validator from './Validator'

class TokenProvider {
  #httpClient
  #clientSecret

  /**
   * TokenProvider class
   *
   * @param {object} params - an object with all data necessary to init TokenProvider, required
   * @param {string} params.identityServerHostName - authorization hostname, required
   * @param {string} params.clientId - configuration clientId, not required, but then must be passed into "generateToken(secrets)" or "getToken(secrets)"
   * @param {string} params.clientSecret - configuration clientSecret, not required, but then must be passed into "generateToken(secrets)" or "getToken(secrets)"
   * @param {string} params.token - token, not required
   * @param {string} params.tokenType - tokenType, not required
   * @param {string} params.authEndpoint - authorization endpoint, not required, default value: 'connect/token'
   *
   */

  constructor ({
                 identityServerHostName,
                 clientId,
                 clientSecret,
                 token,
                 tokenType,
                 authEndpoint = 'connect/token'
               } = {}) {
    const config = {
      baseURL: identityServerHostName,
      json: true
    }
    this._validateTokenProvider(identityServerHostName)

    this.authEndpoint = authEndpoint

    this.token = token
    this.tokenType = tokenType

    this.#httpClient = new HttpClientCreator({config}).create()

    this.clientId = clientId
    this.#clientSecret = clientSecret
  }

  get isAuthorized () {
    const {tokenType, token} = this
    return tokenType && token
  }

  get _data () {
    return `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.#clientSecret}`
  }

  async getToken (secrets) {
    if (this.isAuthorized) {
      const {tokenType, token} = this
      return {tokenType, token}
    } else {
      return this.generateToken(secrets)
    }
  }

  async generateToken (secrets) {
    if (!!secrets) this._setSecrets(secrets)
    try {
      this._validateGenerateToken(this)

      const response = await this.#httpClient.post(this.authEndpoint, this._data)

      const tokenInfo = this._parseTokenInfo(response?.data)

      this._setTokenInfo(tokenInfo)

      return tokenInfo
    } catch (e) {
      return Promise.reject(e)
    }
  }

  _parseTokenInfo (tokenInfo) {
    const {
      access_token,
      token,
      expires_in,
      expiresIn,
      token_type,
      tokenType,
      scope
    } = tokenInfo || {}

    return {
      token: token || access_token,
      expiresIn: expiresIn || expires_in,
      tokenType: tokenType || token_type,
      scope
    }
  }

  _setTokenInfo (tokenInfo) {
    const {token, tokenType} = tokenInfo

    this.token = token
    this.tokenType = tokenType
  }

  clearTokenInfo () {
    this.token = undefined
    this.tokenType = undefined
  }

  _setSecrets ({clientSecret, clientId} = {}) {
    if (clientId) this.clientId = clientId
    if (clientSecret) this.#clientSecret = clientSecret
  }

  _validateTokenProvider (identityServerHostName) {
    const validator = new Validator([
      {
        rule: !!identityServerHostName,
        message: `"identityServerHostName" is required field, must be defined`
      }
    ])

    validator.validateWithThrowError()
  }

  _validateGenerateToken (secrets) {
    const validator = new Validator([
      {
        rule: !!secrets.clientId,
        message: `"clientId" is required field, must be defined`
      },
      {
        rule: !!secrets.#clientSecret,
        message: `"clientSecret" is required field, must be defined`
      }
    ])

    validator.validateWithThrowError()
  }
}

export default TokenProvider
