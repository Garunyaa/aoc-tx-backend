import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

/**
 * ExceptionalTransactionSchema
 * @description ExceptionalTransaction model
 */

const ExceptionalTransactionSchema = new Schema({

    identifier_code: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    amount_contributed: {
        type: String,
        required: true
    },
    date_of_contribution: {
        type: String,
        required: true
    },
    transaction_code: {
        type: String,
        required: true,
        unique: true
    },
    contributor_wallet: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    granting_reason: {
        type: String
    },
    member_type: {
        type: String
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

ExceptionalTransactionSchema.plugin(mongoosePaginate);

export const ExceptionalTransaction = model('ExceptionalTransaction', ExceptionalTransactionSchema);