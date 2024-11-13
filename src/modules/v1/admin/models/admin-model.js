import { Schema, model } from 'mongoose';

/**
 * AdminSchema
 * @description Admin model
 */

const AdminSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    wallet_address: {
        type: String,
        required: [true, 'wallet address must not be empty'],
        unique: true
    },
    is_primary: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });


export const Admin = model('admin', AdminSchema);