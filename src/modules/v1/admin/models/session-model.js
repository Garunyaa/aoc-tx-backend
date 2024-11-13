import { Schema, model } from "mongoose";
const { ObjectId } = Schema;

/**
 * SessionSchema
 * @description Session model
 */

const SessionSchema = new Schema({

    user_id: {
        type: ObjectId,
        required: true
    },
    session_token: {
        type: String,
        required: true
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

export const Session = model('session', SessionSchema);