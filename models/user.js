import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
});

userSchema.methods.generateHash = password => bcrypt.hashSync(
  password, bcrypt.genSaltSync(8), null,
);

userSchema.methods.validPassword = (password, user) => {
  const localPassword = user.local.password;

  return bcrypt.compareSync(password, localPassword);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
