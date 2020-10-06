const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Login = new Schema({
  userId: {
 type: String
 },
 pass: {
 type: String
 },
 
}, {
 collection: 'login'
})

module.exports = mongoose.model('Login', Login)