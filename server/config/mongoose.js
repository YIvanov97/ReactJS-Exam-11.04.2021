const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect('mongodb://localhost/examyollo', {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection;

    db.on('error', (err) => console.log(err))
    db.once('open', () => console.log('Db connected'))
}
