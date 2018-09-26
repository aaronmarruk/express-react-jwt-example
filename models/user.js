import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
  // TODO check for email type
  email: { unique: true, type: String, required: true },
  password: { type: String, required: true },
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
