const mongoose = require('mongoose');
const mongo = mongoose
  .connect(
    `mongodb+srv://afoimpact:${process.env.DB_PASSWORD}@cluster0.wuycowd.mongodb.net/Administration?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true, 
      keepAliveInitialDelay: 300000 
    }
  )
  .then((con) => console.log('DB connection successful !'));

module.exports = { mongo: async() => await mongo };
