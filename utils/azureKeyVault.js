import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { Client } from 'pg';

// Load environment variables
const keyVaultName = process.env.KEY_VAULT_NAME;
const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;
const clientId = process.env.CLIENT_ID;
const tenantId = process.env.TENANT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log("CLIENT_ID:", clientId);
console.log("TENANT_ID:", tenantId);
console.log("CLIENT_SECRET:", clientSecret ? "Loaded" : "Not Loaded");
console.log("KEY_VAULT_URI:", keyVaultUri);

// Create a secret client using DefaultAzureCredential
const credential = new DefaultAzureCredential({
  clientId,
  tenantId,
  clientSecret
});

const client = new SecretClient(keyVaultUri, credential);

// Function to get secret from Key Vault
async function getSecret(secretName) {
  const secret = await client.getSecret(secretName);
  return secret.value;
}

// Example of storing and retrieving a secret
async function main() {
  // Storing a secret
  const secretName = "test-secret";
  const secretValue = "secret-value";
  await client.setSecret(secretName, secretValue);
  console.log("Secret stored successfully");

  // Retrieving a secret
  const retrievedSecret = await getSecret(secretName);
  console.log("Retrieved secret:", retrievedSecret);

  // Example database connection using secret from Key Vault
  const dbUser = await getSecret("DB_USER");
  const dbHost = await getSecret("DB_HOST");
  const dbName = await getSecret("DB_NAME");
  const dbPassword = await getSecret("DB_PASSWORD");
  const dbPort = await getSecret("DB_PORT");

  const dbClient = new Client({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: parseInt(dbPort, 10),
    ssl: { rejectUnauthorized: false }
  });

  await dbClient.connect();
  console.log("Connected to database");
}

main().catch(err => console.error("Error:", err));
