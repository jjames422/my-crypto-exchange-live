require('dotenv').config({ path: '.env.local' });
const { ClientSecretCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

// Logging environment variables to ensure they are loaded
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("TENANT_ID:", process.env.TENANT_ID);
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET ? "Loaded" : "Not Loaded");
console.log("KEY_VAULT_URI:", process.env.KEY_VAULT_URI);

const clientId = process.env.CLIENT_ID; 
const tenantId = process.env.TENANT_ID; 
const clientSecret = process.env.CLIENT_SECRET;
const keyVaultUri = process.env.KEY_VAULT_URI;

if (!clientId || !tenantId || !clientSecret || !keyVaultUri) {
  throw new Error("Missing required environment variables. Ensure CLIENT_ID, TENANT_ID, CLIENT_SECRET, and KEY_VAULT_URI are set.");
}

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const client = new SecretClient(keyVaultUri, credential);

async function testKeyVault() {
  try {
    console.log("Key Vault URI:", keyVaultUri);

    // Store a secret in the Key Vault
    const secretName = "test-secret";
    const secretValue = "secret-value";
    const result = await client.setSecret(secretName, secretValue);
    console.log("Secret stored successfully:", result);

    // Retrieve the secret from the Key Vault
    const retrievedSecret = await client.getSecret(secretName);
    console.log("Retrieved secret:", retrievedSecret);
  } catch (err) {
    console.error("Error:", err);
    if (err.details) {
      console.error("Error Details:", err.details);
    }
    if (err.message) {
      console.error("Error Message:", err.message);
    }
  }
}

testKeyVault();
