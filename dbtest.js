const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://motadmin%40cryptodbserver:YellowWagonsAreCool0208@cryptodbserver.postgres.database.azure.com:5432/cryptoExchangeDB?sslmode=require',
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    return client.query('SELECT NOW()');
  })
  .then((res) => {
    console.log(res.rows[0]);
    return client.end();
  })
  .then(() => {
    console.log('Disconnected from the database');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection error', err);
    process.exit(1);
  });
