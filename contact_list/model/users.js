const { mongoose, Schema, model } = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name : {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Method to hash password
usersSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});
// Send alert when a user is duplicate
usersSchema.post('save', function(error, doc, next) {
  if(error.email === 'MongoError' && error.code === 11000) {
    next('El correo ya esta en uso')
  } else {
    next(error);
  }
});

// Auth Users
usersSchema.methods = {
  compararPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = model('Users', usersSchema);
