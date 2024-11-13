import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * InitiativeSchema
 * @description Initiative model
 */

const InitiativeSchema = new Schema({

    initiative: {
        type: String,
        required: true
    },
    start_period: {
        type: String,
        required: true
    },
    end_period: {
        type: String,
        required: true
    },
    // start_time: {
    //     type: String,
    //     required: true
    // },
    // end_time: {
    //     type: String,
    //     required: true
    // },
    identifier: {
        type: String,
        required: true
    },
    network: {
        type: String
    },
    wallet_address: {
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

InitiativeSchema.plugin(mongoosePaginate);

export const Initiative = model('Initiative', InitiativeSchema);