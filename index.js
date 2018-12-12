'use strict'

const AWS = require('aws-sdk')
const msRestAzure = require('ms-rest-azure')
const KeyVault = require('azure-keyvault')

module.exports = {
  withPrefix: async function (roleKey, vaultName, environment, awsRegion = 'us-east-1') {
    const vaultUri = `https://${vaultName}.vault.azure.net`
    const suffix = environment ? `-${environment}` : ''

    let credentials
    if (process.env.MSI_ENDPOINT) {
      credentials = await msRestAzure.loginWithAppServiceMSI({ resource: 'https://vault.azure.net' })
    } else {
      credentials = await msRestAzure.interactiveLogin()
    }

    const keyVaultClient = new KeyVault.KeyVaultClient(credentials)
    const accessKeyId = (await keyVaultClient.getSecret(vaultUri, `${roleKey}-key${suffix}`, '')).value
    const secretAccessKey = (await keyVaultClient.getSecret(vaultUri, `${roleKey}-secret${suffix}`, '')).value
    AWS.config.accessKeyId = accessKeyId
    AWS.config.secretAccessKey = secretAccessKey
    AWS.config.region = awsRegion
    return AWS
  }
}
