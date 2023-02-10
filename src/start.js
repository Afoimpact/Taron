const app = require('./app');
const serverless = require('serverless-http');

const PORT = process.env.PORT || 6000;

app.listen(PORT, async () => {
  console.log(`Backend Listening on: ${PORT}`);
});

module.exports.handler = serverless(app)
