const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pokemon = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  region: {
    type: String
  },
  evolutionaryLine: {
    type: String
  }
},{
    collection: 'pokemon'
});

module.exports = mongoose.model('Pokemon', Pokemon);