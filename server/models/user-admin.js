const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: "Имя пользователя отсутствует."
  },
  email: {
    type: String,
    unique: true,
    required: "E-mail пользователя не должен быть пустым.",
    validate: [
      {
        validator: function checkEmail(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.'
      }
    ]
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    required: true,
    type: String
  }
}, {timestamps: true});

userSchema.pre('save', function(next) {
  // Если пароль небыл изменен - делаем next();
  if(!this.isModified('passwordHash')){
    return next();
  }
  let psd = this.passwordHash;
  let saltRounds = 10;  // количество символов в новой соли
  bcrypt.genSalt(saltRounds, function(err, salt) { // генерируем соль
    if (err) next(err);
    let generatedSalt = salt; // Если все хорошо - создаем hash на основе пароля и соли
    bcrypt.hash(psd, generatedSalt, function(err, hash) {
      if (err) next(err);
      this.passwordHash = hash; // Теперь пароль зашифован!
      this.salt = generatedSalt;
      next();
    });
  });
});

userSchema.methods.comparePassword = (password)=>{
  if (!password) return false; // empty password means no login by password
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)
  if (!this.salt) return false; // this user does not have password (the line below would hang!)

  var result = bcrypt.compareSync(password, this.passwordHash);
  return result
};

module.exports = mongoose.model('UserAdmin', userSchema);
