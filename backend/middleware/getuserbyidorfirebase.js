import mongoose from 'mongoose';
import { User } from '../models/user.model.js';

export const getUserByIdOrFirebaseUID = async (id) => {
    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
        user = await User.findById(id);
    }

    if (!user) {
        user = await User.findOne({ firebaseUID: id });
    }

    return user;
};
