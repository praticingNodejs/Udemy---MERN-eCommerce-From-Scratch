import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });

UserSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compareSync(userPassword, this.password)
};

export const User = mongoose.model('users', UserSchema);
