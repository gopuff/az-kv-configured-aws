# :warning: DEPRECATED REPO: DO NOT USE :warning:

# az-kv-configured-aws

Get a configured AWS library for a given role. Counts on entries in Azure Key Vault
with `<prefix>-key` and `<prefix>-secret`. If the `environment` argument is set,
it will look for `<prefix>-key-<environment>` and `<prefix>-secret-<environment>
insetad.

## Usage

Install the package:
```
npm install az-kv-configured-aws
```

Then, in your app:
```
const awsFactory = require('az-kv-configured-aws').withPrefix('sample-prefix', 'my-vault-name')

module.exports = async function(...) {
    const AWS = await awsFactory
    const kinesis = new AWS.Kinesis()
    ...
}
```

## Exports

```
withPrefix(
    roleKey, // e.g. 'sample-prefix'
    vaultName,
    environment, // e.g. process.env.NODE_ENV or 'production'
    awsRegion = 'us-east-1'
)
```
