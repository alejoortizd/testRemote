const { Schema, model } = require('mongoose');

const contactsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

module.exports = model('Contacts', contactsSchema);
