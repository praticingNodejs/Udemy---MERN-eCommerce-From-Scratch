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

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hashSync(this.password, salt)
    }

    return next()
});

export const User = mongoose.model('users', UserSchema);
