const mongoose = require('mongoose')
const Schema = mongoose.Schema
const inputURLSchema = new Schema({
  inputURL: {
    type: String,
    required: true,
  },
  outputURL: {
    type: String,
  },
})

module.exports = mongoose.model('URL', inputURLSchema)
