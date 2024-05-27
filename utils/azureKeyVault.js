const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();

const storeSecretInKeyVault = async (keyVaultUri, secretName, secretValue) => {
  const client = new SecretClient(keyVaultUri, credential);
  await client.setSecret(secretName, secretValue);
};

const getSecretFromKeyVault = async (keyVaultUri, secretName) => {
  const client = new SecretClient(keyVaultUri, credential);
  const secret = await client.getSecret(secretName);
  return secret.value;
};

module.exports = {
  storeSecretInKeyVault,
  getSecretFromKeyVault,
};
